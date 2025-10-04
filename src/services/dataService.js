import { supabase } from '../lib/supabase';

export const dataService = {
  async getUserPreferences(userId) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateUserPreferences(userId, preferences) {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getChallenges(category = null, difficulty = null) {
    let query = supabase.from('challenges').select('*');

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getUserActivities(userId, limit = null) {
    let query = supabase
      .from('user_activities')
      .select(`
        *,
        challenges (
          title,
          category,
          icon
        )
      `)
      .eq('user_id', userId)
      .order('started_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  async startActivity(userId, challengeId) {
    const { data, error } = await supabase
      .from('user_activities')
      .insert([
        {
          user_id: userId,
          challenge_id: challengeId,
          status: 'in_progress',
          started_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async completeActivity(activityId, durationMinutes, notes = null) {
    const { data, error } = await supabase
      .from('user_activities')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        duration_minutes: durationMinutes,
        notes,
      })
      .eq('id', activityId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateActivity(activityId, updates) {
    const { data, error } = await supabase
      .from('user_activities')
      .update(updates)
      .eq('id', activityId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserStats(userId) {
    const { data: activities, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'completed');

    if (error) throw error;

    const totalChallenges = activities.length;
    const totalMinutes = activities.reduce((sum, a) => sum + (a.duration_minutes || 0), 0);

    const streakData = calculateStreak(activities);

    return {
      totalChallenges,
      totalMinutes,
      currentStreak: streakData.current,
      longestStreak: streakData.longest,
    };
  },

  async getAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('requirement_value', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getUserAchievements(userId) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievements (
          title,
          description,
          category,
          icon,
          requirement_type,
          requirement_value
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  },

  async updateAchievementProgress(userId, achievementId, progress) {
    const { data, error } = await supabase
      .from('user_achievements')
      .upsert({
        user_id: userId,
        achievement_id: achievementId,
        progress,
        unlocked_at: progress >= 100 ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getActivityHeatmap(userId, days = 84) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('user_activities')
      .select('completed_at, duration_minutes')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('completed_at', startDate.toISOString());

    if (error) throw error;

    const heatmapData = [];
    const activityMap = {};

    data.forEach((activity) => {
      const date = activity.completed_at.split('T')[0];
      activityMap[date] = (activityMap[date] || 0) + 1;
    });

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = activityMap[dateStr] || 0;

      heatmapData.push({
        date: dateStr,
        challenges: count,
        level: count === 0 ? 0 : Math.min(Math.ceil(count / 1.5), 4),
      });
    }

    return heatmapData;
  },

  async getCategoryDistribution(userId) {
    const { data, error } = await supabase
      .from('user_activities')
      .select(`
        challenges (
          category
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'completed');

    if (error) throw error;

    const distribution = {};
    data.forEach((activity) => {
      const category = activity.challenges?.category;
      if (category) {
        distribution[category] = (distribution[category] || 0) + 1;
      }
    });

    return distribution;
  },
};

function calculateStreak(activities) {
  if (!activities || activities.length === 0) {
    return { current: 0, longest: 0 };
  }

  const sortedActivities = activities
    .map((a) => new Date(a.completed_at))
    .sort((a, b) => b - a);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;
  let lastDate = sortedActivities[0];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActivityDate = new Date(lastDate);
  lastActivityDate.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 1) {
    currentStreak = 1;

    for (let i = 1; i < sortedActivities.length; i++) {
      const currentDate = new Date(sortedActivities[i]);
      currentDate.setHours(0, 0, 0, 0);

      const prevDate = new Date(sortedActivities[i - 1]);
      prevDate.setHours(0, 0, 0, 0);

      const diff = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        currentStreak++;
      } else if (diff > 1) {
        break;
      }
    }
  }

  for (let i = 1; i < sortedActivities.length; i++) {
    const currentDate = new Date(sortedActivities[i]);
    currentDate.setHours(0, 0, 0, 0);

    const prevDate = new Date(sortedActivities[i - 1]);
    prevDate.setHours(0, 0, 0, 0);

    const diff = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { current: currentStreak, longest: longestStreak };
}

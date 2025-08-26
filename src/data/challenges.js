export const challengeCategories = {
  physical: {
    name: 'Physical',
    icon: 'running',
    color: 'physical'
  },
  mindfulness: {
    name: 'Mindfulness',
    icon: 'brain',
    color: 'mindfulness'
  },
  learning: {
    name: 'Learning',
    icon: 'book',
    color: 'learning'
  },
  creativity: {
    name: 'Creativity',
    icon: 'lightbulb',
    color: 'creativity'
  },
  productivity: {
    name: 'Productivity',
    icon: 'tasks',
    color: 'productivity'
  },
  social: {
    name: 'Social',
    icon: 'users',
    color: 'social'
  }
}

export const challenges = [
  // Physical Challenges
  {
    id: 'desk-stretches',
    title: 'Quick Desk Stretches',
    description: '5 simple stretches to relieve tension',
    category: 'physical',
    duration: 5,
    difficulty: 2,
    instructions: [
      'Sit up straight in your chair',
      'Roll your shoulders backward 10 times',
      'Tilt your head left and right, hold for 10 seconds each',
      'Stretch your arms overhead and lean left, then right',
      'Twist your torso left and right while keeping hips forward'
    ]
  },
  {
    id: 'wall-pushups',
    title: 'Wall Push-ups',
    description: 'Quick upper body activation',
    category: 'physical',
    duration: 3,
    difficulty: 1,
    instructions: [
      'Stand arm\'s length from a wall',
      'Place palms flat against wall at shoulder height',
      'Do 10-15 wall push-ups',
      'Focus on controlled movement',
      'Rest and repeat if time allows'
    ]
  },
  {
    id: 'stair-climb',
    title: 'Stair Climbing',
    description: 'Quick cardio boost',
    category: 'physical',
    duration: 5,
    difficulty: 3,
    instructions: [
      'Find a staircase',
      'Walk up and down for 3 minutes',
      'Take two steps at a time if comfortable',
      'Focus on breathing',
      'Cool down with gentle stretching'
    ]
  },

  // Mindfulness Challenges
  {
    id: 'focus-breathing',
    title: 'Focus Breathing',
    description: 'A guided 4-7-8 breathing technique',
    category: 'mindfulness',
    duration: 5,
    difficulty: 1,
    instructions: [
      'Sit comfortably with eyes closed',
      'Inhale through nose for 4 counts',
      'Hold breath for 7 counts',
      'Exhale through mouth for 8 counts',
      'Repeat cycle 4-6 times'
    ]
  },
  {
    id: 'body-scan',
    title: 'Body Scan Meditation',
    description: 'Quick relaxation technique',
    category: 'mindfulness',
    duration: 5,
    difficulty: 2,
    instructions: [
      'Lie down or sit comfortably',
      'Close your eyes and breathe naturally',
      'Start from your toes, notice any sensations',
      'Slowly move attention up through your body',
      'End at the top of your head'
    ]
  },
  {
    id: 'gratitude-moment',
    title: 'Gratitude Moment',
    description: 'Reflect on positive aspects',
    category: 'mindfulness',
    duration: 3,
    difficulty: 1,
    instructions: [
      'Take three deep breaths',
      'Think of three things you\'re grateful for today',
      'Focus on why each one matters to you',
      'Feel the positive emotions',
      'Carry this feeling with you'
    ]
  },

  // Learning Challenges
  {
    id: 'vocabulary-builder',
    title: 'Vocabulary Builder',
    description: 'Learn 5 new words and their usage',
    category: 'learning',
    duration: 5,
    difficulty: 2,
    instructions: [
      'Choose a topic that interests you',
      'Look up 5 new words related to that topic',
      'Read their definitions and pronunciations',
      'Create a sentence using each word',
      'Review and try to use them today'
    ]
  },
  {
    id: 'speed-reading',
    title: 'Speed Reading Practice',
    description: 'Improve reading speed and comprehension',
    category: 'learning',
    duration: 10,
    difficulty: 3,
    instructions: [
      'Choose an article or book chapter',
      'Read for 2 minutes at normal speed',
      'Count words read and calculate WPM',
      'Read next section 25% faster',
      'Summarize what you read'
    ]
  },
  {
    id: 'language-phrases',
    title: 'Language Phrases',
    description: 'Learn 5 phrases in a new language',
    category: 'learning',
    duration: 5,
    difficulty: 2,
    instructions: [
      'Choose a language you want to learn',
      'Pick 5 common travel phrases',
      'Practice pronunciation using online tools',
      'Write them down with translations',
      'Try to use them in conversation'
    ]
  },

  // Creativity Challenges
  {
    id: 'speed-sketching',
    title: 'Speed Sketching',
    description: 'Quick creative exercise without judgment',
    category: 'creativity',
    duration: 5,
    difficulty: 3,
    instructions: [
      'Get paper and pencil',
      'Look around and pick an object',
      'Sketch it in 1 minute without lifting pencil',
      'Try 3-4 different objects',
      'Don\'t worry about perfection'
    ]
  },
  {
    id: 'word-association',
    title: 'Word Association Story',
    description: 'Create a mini story from random words',
    category: 'creativity',
    duration: 5,
    difficulty: 2,
    instructions: [
      'Think of 5 random words',
      'Write them down',
      'Create a short story connecting all words',
      'Be as creative and silly as you want',
      'Read it aloud when finished'
    ]
  },
  {
    id: 'color-palette',
    title: 'Color Palette Creation',
    description: 'Design a color scheme from your surroundings',
    category: 'creativity',
    duration: 3,
    difficulty: 1,
    instructions: [
      'Look around your current space',
      'Identify 5 colors you see',
      'Imagine how they work together',
      'Think of what mood they create',
      'Consider where you\'d use this palette'
    ]
  },

  // Productivity Challenges
  {
    id: 'rapid-task-sweep',
    title: 'Rapid Task Sweep',
    description: 'Clear 5 small tasks in 5 minutes',
    category: 'productivity',
    duration: 5,
    difficulty: 1,
    instructions: [
      'List 5 small tasks you\'ve been avoiding',
      'Set timer for 5 minutes',
      'Complete as many as possible',
      'Focus on quick wins',
      'Celebrate your progress'
    ]
  },
  {
    id: 'email-cleanup',
    title: 'Email Cleanup',
    description: 'Organize and clear your inbox',
    category: 'productivity',
    duration: 10,
    difficulty: 2,
    instructions: [
      'Open your email inbox',
      'Delete obvious spam and promotions',
      'Unsubscribe from 3 unwanted lists',
      'Archive or file important emails',
      'Respond to one urgent email'
    ]
  },
  {
    id: 'workspace-organize',
    title: 'Workspace Organization',
    description: 'Tidy and optimize your work area',
    category: 'productivity',
    duration: 5,
    difficulty: 1,
    instructions: [
      'Clear your desk surface',
      'Put items back in their designated places',
      'Wipe down surfaces',
      'Organize cables and chargers',
      'Set up for your next task'
    ]
  },

  // Social Challenges
  {
    id: 'gratitude-message',
    title: 'Gratitude Message',
    description: 'Send a thank you message to someone',
    category: 'social',
    duration: 3,
    difficulty: 1,
    instructions: [
      'Think of someone who helped you recently',
      'Write a brief thank you message',
      'Be specific about what they did',
      'Express how it made you feel',
      'Send it via text, email, or call'
    ]
  },
  {
    id: 'compliment-giving',
    title: 'Genuine Compliment',
    description: 'Give a meaningful compliment to someone',
    category: 'social',
    duration: 2,
    difficulty: 1,
    instructions: [
      'Look for someone around you',
      'Notice something genuinely positive about them',
      'Approach them with a smile',
      'Give a specific, sincere compliment',
      'Notice how it makes both of you feel'
    ]
  }
]

export function getChallengesByCategory(category) {
  if (category === 'all') {
    return challenges
  }
  return challenges.filter(challenge => challenge.category === category)
}

export function getChallengesByDuration(duration, tolerance = 2) {
  return challenges.filter(challenge => 
    Math.abs(challenge.duration - duration) <= tolerance
  )
}

export function getChallengeById(id) {
  return challenges.find(challenge => challenge.id === id)
}

export function getRandomChallenges(count = 5, category = 'all', duration = null) {
  let filteredChallenges = getChallengesByCategory(category)
  
  if (duration) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      Math.abs(challenge.duration - duration) <= 2
    )
  }
  
  // Shuffle array and return requested count
  const shuffled = [...filteredChallenges].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
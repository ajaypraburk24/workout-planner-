export interface Quote {
  id: string;
  text: string;
  author: string;
  category: 'discipline' | 'strength' | 'resilience' | 'nutrition' | 'mindset';
}

export const MOTIVATIONAL_QUOTES: Quote[] = [
  {
    id: 'q1',
    text: "We don't rise to the level of our expectations, we fall to the level of our training.",
    author: "Archilochus",
    category: 'discipline'
  },
  {
    id: 'q2',
    text: "The body achieves what the mind believes.",
    author: "Napoleon Hill",
    category: 'mindset'
  },
  {
    id: 'q3',
    text: "Discipline is doing what needs to be done, even if you don't want to do it.",
    author: "Lou Holtz",
    category: 'discipline'
  },
  {
    id: 'q4',
    text: "Strength does not come from winning. Your struggles develop your strengths.",
    author: "Arnold Schwarzenegger",
    category: 'strength'
  },
  {
    id: 'q5',
    text: "You don't have to be extreme, just consistent.",
    author: "Fitness Creed",
    category: 'resilience'
  },
  {
    id: 'q6',
    text: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success.",
    author: "Dwayne Johnson",
    category: 'resilience'
  },
  {
    id: 'q7',
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    category: 'nutrition'
  },
  {
    id: 'q8',
    text: "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.",
    author: "Arnold Schwarzenegger",
    category: 'mindset'
  },
  {
    id: 'q9',
    text: "Action is the foundational key to all success. Don't wait for motivation, create momentum.",
    author: "Pablo Picasso",
    category: 'discipline'
  },
  {
    id: 'q10',
    text: "Your only limit is you. What feels like sacrifice today will be your strength tomorrow.",
    author: "Marcus Aurelius",
    category: 'strength'
  }
];

export function getRandomQuote(): Quote {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[index];
}

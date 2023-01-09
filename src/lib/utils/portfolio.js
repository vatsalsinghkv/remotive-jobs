import { capitalize } from './helper';

export const app = {
  name: 'Remotive Jobs',
  url: 'https://remotive-jobs.vercel.app',
  github: 'https://github.com/vatsalsinghkv/remotive-jobs',
  image:
    'https://user-images.githubusercontent.com/68834718/189035104-aa71647e-33e4-442a-a2f9-c0d50bba2db1.png',
};

export const author = {
  name: 'Vatsal Singh',
  facebook: 'https://www.facebook.com/vatsalsinghkv',
  instagram: 'https://www.instagram.com/vatsalsinghkv',
  twitter: 'https://twitter.com/vatsalsinghkv',
  github: 'https://github.com/vatsalsinghkv',
};

export const getJobSeoData = ({
  name,
  category,
  company,
  salary,
  location,
}) => ({
  title: `${capitalize(name)} | ${capitalize(company)} | ${capitalize(
    category
  )}`,
  description: `A ${category} ${capitalize(
    name
  )} remote job in the company ${capitalize(
    company
  )}! Required location: ${capitalize(location)}. ${
    salary ? `With the salary of ${salary}` : ''
  } `,
  url: app.url,
  author: app.author,
  image: app.image,
  keywords: [
    'remotive jobs',
    'remote jobs',
    `${name}`,
    `${company}`,
    `${category} jobs`,
    `${location} based remote job`,
    `A remote job with ${salary}`,
    'work from home jobs',
  ],
});

export const getSeoData = (
  categories = 'Programming, Support, Design and more',
  profiles = 'developer, customer support rep, product or sales professional'
) => ({
  title: `Remote Jobs in ${capitalize(categories)}`,
  description: `Find the best remote job, working as a ${profiles}... All jobs are hand curated and allow remote work. We serve the best work from home jobs in popular categories. Talent is everywhere, work remotely today!`,
  url: app.url,
  author: app.author,
  image: app.image,
  keywords: [
    'remotive jobs',
    'remote jobs',
    'github jobs',
    'work from home jobs',
    'programming jobs',
    'support jobs',
    'online jobs',
  ],
});

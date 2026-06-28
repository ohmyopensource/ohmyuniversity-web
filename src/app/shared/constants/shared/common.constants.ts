export const ORGANIZATION = {
  name: 'OhMyOpenSource!',
  logo: '/logo/ohmyuniversity-logo.svg',
  email: 'info@ohmyopensource.org',
  website: 'https://github.com/ohmyopensource',
  piva: 'IT00000000000',
  social: {
    linkedin: '',
    github: '',
    instagram: '',
    x: '',
  },
  support: {
    paypal: '',
    kofi: '',
    ghsponsor: '',
  },
};

export const APP = {
  name: 'OhMyUniversity!',
  logo: '/logo/ohmyuniversity-logo.svg',
  email: 'info@ohmyuniversity.org',
  website: 'https://github.com/ohmyopensource',
  social: {
    linkedin: '',
    github: '',
    instagram: '',
    x: '',
  },
} as const;

export const PAGINATION = {
  defaultPageSize: 1,
  pageSizeOptions: [10, 25, 50, 100],
  threshold: 1,
} as const;

export const TEAM_MEMBERS_INFO = {
  luca: {
    name: 'Luca',
    github_username: 'Luxauram',
    github_profile_link: 'https://github.com/Luxauram',
    github_profile_picture: 'https://github.com/Luxauram.png',
    website: 'www.luxauramdev.com',
    linkedin: 'https://www.linkedin.com/in/luca-daurizio/',
  },

  vittorio: {
    name: 'Vittorio',
    github_username: 'VittorioDiPalma',
    github_profile_link: 'https://github.com/VittorioDiPalma',
    github_profile_picture: 'https://github.com/VittorioDiPalma.png',
    website: 'NULL',
    linkedin: 'https://www.linkedin.com/in/vittorio-di-palma-18a049392/',
  },

  alessio: {
    name: 'Alessio',
    github_username: 'alessiodlm',
    github_profile_link: 'https://github.com/alessiodlm',
    github_profile_picture: 'https://github.com/alessiodlm.png',
    website: 'NULL',
    linkedin: 'https://www.linkedin.com/in/alessio-del-muto-7abb13401/',
  },

  antonio: {
    name: 'Antonio',
    github_username: 'antoniods10',
    github_profile_link: 'https://github.com/antoniods10',
    github_profile_picture: 'https://github.com/antoniods10.png',
    website: 'NULL',
    linkedin: 'https://www.linkedin.com/in/antonio-de-santis-034908401/',
  },
} as const;

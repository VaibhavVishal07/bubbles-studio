/**
 * All copy and content for the site lives here.
 * Edit this file to change text, links, or which items appear —
 * the components read everything from these exports.
 */

export const hero = {
  badge: 'Hello, I’m Vaibhav',
  intro:
    'A product designer from India with 6+ years of experience in B2C design. ' +
    'I focus on building from 0 to 1, making data-driven decisions, and crafting intuitive UIs.',
  primaryCta: { label: 'Get My Resume', href: '' },
  secondaryCta: { label: 'Send Me a Mail', href: '' },
}

export const mainQuests = {
  /** The original uses the singular on desktop and the plural below 1440px. */
  heading: 'Main Quest',
  headingNarrow: 'Main Quests',
  subtitleBefore: 'Get the highlights, not the hassle—grab my ',
  subtitleLink: { label: 'mini portfolio', href: '' },
}

export type Project = {
  id: string
  number: string
  title: string
  blurb: string
  /** Card artwork shown on the desktop layout. */
  image: string
  /** Accent colours used by the drawn card on tablet / mobile. */
  accent: {
    title: string
    number: string
    blurb: string
    border: string
    gradient: string
    glow: string
  }
  caseStudy: CaseStudy
}

export type CaseStudy = {
  title: string
  context: string
  team: string
  role?: string[]
  nda?: boolean
  ndaNote?: string
  sections?: { heading: string; body: string }[]
}

export const projects: Project[] = [
  {
    id: 'banners',
    number: '01',
    title: 'Lights , Camera, Banners',
    blurb: 'Driving User Engagement through Dynamic Banner Design',
    image: '/img/card-01-banners.png',
    accent: {
      title: 'linear-gradient(90deg, rgb(255, 136, 129) 0%, rgb(255, 194, 191) 100%)',
      number: 'rgb(255, 154, 147)',
      blurb: 'linear-gradient(90deg, rgb(255, 136, 129) 0%, rgb(255, 162, 156) 100%)',
      border: 'rgba(255, 154, 147, .4)',
      gradient: 'linear-gradient(70.92deg, #160d0d 0%, rgba(36,36,36,1) 100%)',
      glow: '#ff9a9433',
    },
    caseStudy: {
      title: 'Lights , Camera, Banners',
      context:
        'Xstream Play’s homepage banners, despite their prominent placement, had the lowest ' +
        'click-through rate. User research revealed they were perceived as generic and unengaging. ' +
        'StreamNow decided to redesign them using AI, focusing on personalization, dynamic content ' +
        '(trailers, live sports), and richer information. This involved coordinating with 20+ partners ' +
        'and extensive testing to optimize for different platforms. The goal was to significantly ' +
        'improve CTR and user engagement.',
      team: '2 Designers, 10+ Engineers, 1 Product Manager, 2 Content Managers',
      role: [
        'Leading the end to end experience,',
        'aligning internal & external stakeholders,',
        'collaborating with PMs & engineers.',
      ],
      sections: [
        {
          heading: 'Research',
          body:
            'Our research revealed a strong user preference for immersive, interactive content formats ' +
            'like those found on Instagram Reels, Chingari, Josh, and Moj. This suggests users enjoy ' +
            'short-form videos and the ability to quickly skip through content with a simple swipe.',
        },
      ],
    },
  },
  {
    id: 'sound-of-style',
    number: '02',
    title: 'The Sound of Style',
    blurb: 'A Sleek, Smarter Music Player Built for Seamless Listening.',
    image: '/img/card-02-sound-of-style.png',
    accent: {
      title: 'rgb(195, 254, 181)',
      number: 'rgb(195, 254, 181)',
      blurb: 'rgb(133, 199, 72)',
      border: '#4c6348',
      gradient: 'linear-gradient(70.92deg, #0f1612 0%, rgba(36,36,36,1) 100%)',
      glow: '#d5ffcb33',
    },
    caseStudy: {
      title: 'The Sound of Style',
      context: 'This project is under NDA. Please reach out to me for more details',
      team: '1 Product Designer, 2 Graphic Designers, 10+ Engineers, 1 Product Manager, 2 Content Managers',
      nda: true,
      ndaNote: 'UNDER NDA',
    },
  },
  {
    id: 'everything-all-at-once',
    number: '03',
    title: 'Everything, All At Once',
    blurb: 'Unifying OTT Subscription and Viewing Experience',
    image: '/img/card-03-everything-all-at-once.png',
    accent: {
      title: 'rgb(155, 176, 255)',
      number: 'rgb(150, 173, 254)',
      blurb: 'rgb(164, 184, 255)',
      border: '#4b567a',
      gradient: 'linear-gradient(70.92deg, #0d1216 0%, rgba(36,36,36,1) 100%)',
      glow: '#99affe33',
    },
    caseStudy: {
      title: 'Everything, All at Once',
      context: 'This project is under NDA. Please reach out to me for more details',
      team: '2 Product Designers, 10+ Engineers, 1 Product Manager, 2 Content Managers',
      nda: true,
      ndaNote: 'UNDER NDA',
    },
  },
  {
    id: 'how-to-decide',
    number: '04',
    title: 'How to Decide?',
    blurb: 'Easing User’s Decision Making to Purchase a Service',
    image: '/img/card-04-how-to-decide.png',
    accent: {
      title: 'rgb(254, 175, 232)',
      number: 'rgb(255, 176, 234)',
      blurb: 'rgb(191, 121, 159)',
      border: '#714c61',
      gradient: 'linear-gradient(70.92deg, #160d0d 0%, rgba(36,36,36,1) 100%)',
      glow: '#92616d66',
    },
    caseStudy: {
      title: 'How to Decide?',
      context:
        'The goal was to transform the SKU details page into a high-impact touchpoint that maximizes ' +
        'conversions by providing a more immersive, informative, and trust-driven experience. Data ' +
        'revealed that nearly half of the users who make a booking first visit the details page, and ' +
        'their conversion rate is significantly higher than those who book directly from the SKU card. ' +
        'This highlighted a major opportunity to optimize the page as a key conversion driver. However, ' +
        'the existing details page suffered from cluttered components, redundant information, and a lack ' +
        'of structured storytelling that guides users toward a confident purchase decision.',
      team: '2 Product Designers, 10+ Engineers, 1 Product Manager, 2 Content Managers',
      sections: [
        {
          heading: 'Approach',
          body:
            'By reimagining the page with a user-first approach, the focus was on integrating immersive ' +
            'product media, strong social proofing elements, clear pricing and offers, add-ons and upsell ' +
            'opportunities, and a persistent CTA to streamline the purchase journey. The objective was not ' +
            'just to improve engagement but to create a seamless flow that reduces decision fatigue, ' +
            'enhances perceived value, and ultimately drives higher conversions. Additionally, the rollout ' +
            'was planned in phases to test the effectiveness of each component, ensuring a data-backed, ' +
            'iterative approach to refining the user experience.',
        },
      ],
    },
  },
]

export const sideQuests = {
  heading: 'Side Quests',
  body:
    'Outside the main quests, I dive into fiction—especially graphic novels. I used to grind ' +
    'tactical shooters but moved on. Now, I’m obsessed with weight training, logging every detail ' +
    'in my home gym. To reset, I pour paint for calm and tinker with tech—like the 8TB mini server ' +
    'I built just for fun.',
}

/** The three cards shown on every breakpoint. */
export const nowCards = [
  { id: 'reading', label: 'CURRENTLY\nREADING', image: '/img/reading-behave.png', frame: 'portrait' },
  { id: 'playing', label: 'CURRENTLY\nPLAYING', image: '/img/playing-balatro.png', frame: 'square' },
  { id: 'watching', label: 'CURRENTLY\nWATCHING', image: '/img/watching-for-all-mankind.png', frame: 'portrait' },
] as const

/** Two extra wide cards that only appear on tablet / mobile, as in the original. */
export const buildCards = [
  {
    id: 'lego',
    label: 'LAST LEGO BUILD',
    front: '/img/lego-front.png',
    back: '/img/lego-back.png',
  },
  {
    id: 'keyboard',
    label: 'LAST CUSTOM\nBUILD',
    front: '/img/keyboard-front.png',
    back: '/img/keyboard-back.png',
  },
] as const

export const relevantLinks = {
  heading: 'Relevant Links',
  /**
   * The published Framer site left these unlinked, so they are empty here.
   * Drop a URL in and the row becomes a real anchor.
   */
  items: [
    { label: 'Resume', href: '' },
    { label: 'Mini Portfolio', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'Dribbble', href: '' },
  ],
}

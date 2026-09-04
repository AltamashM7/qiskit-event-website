export interface EventMetaItem {
  readonly label: string;
  readonly value: string;
}

export interface RegistrationConfig {
  readonly label: string;
  readonly href: string;
  readonly note?: string;
}

export interface ScheduleEntry {
  readonly day?: string;
  readonly date?: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly category: string;
  readonly title: string;
  readonly speaker?: string;
  readonly facilitator?: string;
  readonly venue?: string;
  readonly description?: string;
}

export interface Speaker {
  readonly name: string;
  readonly role: string;
  readonly affiliation: string;
  readonly bio?: string;
  readonly photo?: string;
  readonly sessionAssociation?: string;
}

export interface Organizer {
  readonly name: string;
  readonly category?: string;
  readonly logo?: string;
}

export interface ExperienceItem {
  readonly index: string;
  readonly label: string;
  readonly description: string;
}

export interface EditorialContent {
  readonly statement: string;
  readonly paragraphs: readonly string[];
}

export interface HomeEventContent {
  readonly snapshot: readonly EventMetaItem[];
  readonly about: EditorialContent;
  readonly experience: readonly ExperienceItem[];
  readonly programPreview: readonly ScheduleEntry[];
  readonly speakersPreview: readonly Speaker[];
  readonly organizers: readonly Organizer[];
  readonly registration: RegistrationConfig;
  readonly contact: string;
}

export const homeEvent: HomeEventContent = {
  snapshot: [
    { label: 'DATE', value: '15–17 October 2026' },
    { label: 'LOCATION', value: 'Pune, Maharashtra' },
    { label: 'FORMAT', value: 'In-person' },
    { label: 'AUDIENCE', value: 'University students' },
  ],
  about: {
    statement:
      'An immersive university-led quantum computing event designed to move participants from foundational ideas to practical experimentation with Qiskit.',
    paragraphs: [
      'Qiskit Fall Fest brings students together for a focused program of learning, guided experimentation, collaborative problem solving, and hands-on quantum computing.',
      'The event is designed to help participants build confidence with core ideas, work directly with Qiskit, and apply what they learn through practical activities.',
    ],
  },
  experience: [
    {
      index: '01',
      label: 'LEARN',
      description: 'Build an intuitive foundation in quantum computing concepts.',
    },
    {
      index: '02',
      label: 'EXPERIMENT',
      description: 'Translate concepts into quantum circuits through guided Qiskit exercises.',
    },
    {
      index: '03',
      label: 'COLLABORATE',
      description: 'Work through problems with other students, mentors, and facilitators.',
    },
    {
      index: '04',
      label: 'BUILD',
      description: 'Apply the ideas in a practical challenge and present the result.',
    },
  ],
  programPreview: [
    {
      startTime: '09:30',
      endTime: '10:00',
      category: 'WELCOME',
      title: 'Registration & Opening',
    },
    {
      startTime: '10:15',
      endTime: '11:00',
      category: 'SESSION',
      title: 'Quantum Computing Foundations',
    },
    {
      startTime: '14:00',
      endTime: '16:00',
      category: 'WORKSHOP',
      title: 'Hands-on Qiskit Lab',
    },
  ],
  speakersPreview: [
    {
      name: 'Mira Sen',
      role: 'Quantum Computing Researcher',
      affiliation: 'Sample Research Institute',
    },
    {
      name: 'Arjun Rao',
      role: 'Assistant Professor',
      affiliation: 'Example University',
    },
    {
      name: 'Neel Kapoor',
      role: 'Quantum Software Educator',
      affiliation: 'University Research Lab',
    },
  ],
  organizers: [
    { name: 'Host University' },
    { name: 'Student Organizing Team' },
    { name: 'Community Partner' },
  ],
  registration: {
    label: 'Register',
    href: 'https://example.com/registration',
  },
  contact: 'events@example.com',
};

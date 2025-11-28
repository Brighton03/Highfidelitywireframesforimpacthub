/**
 * Canonical skills + interests shared across flows (registration, profile, opportunity finder, event creation)
 */

export const SKILL_OPTIONS = [
  'Delivery Driver',
  'Food Handling',
  'Warehouse Operations',
  'Food Sorting',
  'First Aid',
  'Teaching/Education',
  'Workshop Facilitation',
  'Recycling Expertise',
  'Environmental Education',
  'Gardening',
  'Customer Service',
  'Administrative'
] as const;

export type SkillName = (typeof SKILL_OPTIONS)[number];

export const INTEREST_OPTIONS = [
  'Environment',
  'Food',
  'Education',
  'Health',
  'Animals',
  'Seniors'
] as const;

export type InterestName = (typeof INTEREST_OPTIONS)[number];

export const SKILL_DOCUMENT_REQUIREMENTS: Partial<Record<SkillName, string[]>> = {
  'Delivery Driver': ['Valid Class 3/3A driver licence (front & back)'],
  'Food Handling': ['WSQ FSC Level 1 Certification'],
  'First Aid': ['Basic First Aid / CPR-AED certification']
};

export const HIGH_RISK_SKILLS = Object.keys(SKILL_DOCUMENT_REQUIREMENTS) as SkillName[];

export const createHighRiskSkillSet = () => new Set<SkillName>(HIGH_RISK_SKILLS);

// Backwards compatibility exports (legacy names still referenced in a few files)
export const SKILLS_LIST = SKILL_OPTIONS;
export type Skill = SkillName;

export function isHighRiskSkill(skill: string): boolean {
  return HIGH_RISK_SKILLS.includes(skill as SkillName);
}

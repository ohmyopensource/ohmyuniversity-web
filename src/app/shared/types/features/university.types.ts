/** Represents an Italian university registered in the platform. */
export interface University {
  id: string;
  name: string;
  shortName: string;
  emailDomains: string[];
  city: string;
  type: 'statale' | 'privata' | 'telematica';
  campuses: UniversityCampus[];
}

/**
 * Hand-curated institutional contact (centralino, URP, biblioteca, mensa, ecc.)
 * for a university. Cineca ESSE3 exposes no API for this category of data -
 * every entry here is maintained manually per university, same as `campuses`.
 */
export interface UsefulContact {
  id: string;
  name: string;
  description: string;
  phone?: string;
  email?: string;
  hours?: string;
  campusId?: string;
}

/** Represents a single campus/pole (sede) of a university. */
export interface UniversityCampus {
  id: string;
  name: string;
  city: string;
  address?: string;
}

/** The 6 macro study areas used throughout the orientation flow */
export type AreaId =
  | 'umanistica'
  | 'scientifica'
  | 'ingegneria'
  | 'economica'
  | 'sanitaria'
  | 'artistica';

/** Indicative overall cost tier for a university (tuition + cost of living factored in) */
export type CostTier = 'basso' | 'medio' | 'alto';

/** A specific degree course offered by a university, tagged with its study area */
export interface UniversityCourse {
  area: AreaId;
  name: string;
}

/**
 * Orientation-specific enrichment data for a university, linked by id.
 * Kept separate from the core University interface since this data is
 * specific to the orientation result feature, not a general university attribute.
 */
export interface UniversityOrientationInfo {
  universityId: string;
  strongAreas: AreaId[];
  costTier: CostTier;
  tuitionRange: string;
  courses: UniversityCourse[];
  notes?: string;
}

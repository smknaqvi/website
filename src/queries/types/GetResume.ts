/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResume
// ====================================================

export interface GetResume_personalBio_picture {
  __typename: "Asset";
  /**
   * Get the url for the asset with provided transformations applied.
   */
  url: string;
}

export interface GetResume_personalBio {
  __typename: "PersonalBio";
  name: string;
  careerStatus: string;
  about: string | null;
  gitUrl: string | null;
  linkedinUrl: string | null;
  email: string | null;
  picture: GetResume_personalBio_picture | null;
}

export interface GetResume_educations {
  __typename: "Education";
  school: string;
  fieldOfStudy: string;
  timeline: string;
  description: string;
}

export interface GetResume_experiences_details {
  __typename: "RichText";
  /**
   * Returns HTMl representation
   */
  html: string;
}

export interface GetResume_experiences {
  __typename: "Experience";
  title: string;
  org: string;
  location: string;
  timeline: string;
  skills: string;
  details: GetResume_experiences_details[];
}

export interface GetResume_projects_description {
  __typename: "RichText";
  /**
   * Returns HTMl representation
   */
  html: string;
}

export interface GetResume_projects {
  __typename: "Project";
  name: string;
  repoUrl: string | null;
  skills: string;
  description: GetResume_projects_description;
}

export interface GetResume {
  /**
   * Retrieve a single personalBio
   */
  personalBio: GetResume_personalBio | null;
  /**
   * Retrieve multiple educations
   */
  educations: GetResume_educations[];
  /**
   * Retrieve multiple experiences
   */
  experiences: GetResume_experiences[];
  /**
   * Retrieve multiple projects
   */
  projects: GetResume_projects[];
}

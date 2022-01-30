import { gql } from '@apollo/client/core';

export const getResumeQuery = gql`
  query GetResume {
    personalBio(where: { name: "Kazim Naqvi" }) {
      name
      careerStatus
      about
      gitUrl
      linkedinUrl
      email
    }
    educations(orderBy: startDate_DESC) {
      school
      fieldOfStudy
      timeline
      description
    }
    experiences(orderBy: startDate_DESC) {
      title
      org
      location
      timeline
      skills
      details {
        html
      }
    }
    projects(orderBy: createdAt_DESC) {
      name
      repoUrl
      skills
      description {
        html
      }
    }
  }
`;

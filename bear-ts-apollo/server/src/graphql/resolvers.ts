import { } from './queries';
import { } from './mutations';

const resolvers = {
  Query: {

  },
  Mutation: {

  }
};

// export const resolvers = {
//   Query: {
//     submissions() {
//       return knex.select().from('submissions')
//     },
//     speakers() {
//       return knex.select().from('speakers')
//     },
//     speaker(_: void, { id } : { id: string }) {
//       return knex.select().from('speakers').where({ id })
//         .then((rows: object[]) => rows[0])
//     },
//   },
//   Mutation: {
//     createSpeaker(_: void, { name } : { name: string }) {
//       return knex.insert({ name }, '*').into('speakers')
//         .then((rows: object[]) => rows[0])
//     },
//     createSubmission(_: void, { name, speaker_id } : { name: string, speaker_id: string }) {
//       return knex.insert({ name, speaker_id }, '*').into('submissions')
//         .then((rows: object[]) => rows[0])
//     },
//   },
//   Speaker: {
//     submissions(speaker: Speaker) {
//       return knex.select().from('submissions').where({ speaker_id: speaker.id })
//     },
//   },
//   Submission: {
//     speaker(submission: Submission) {
//       return knex.select().from('speakers').where({ id: submission.speaker_id })
//         .then((rows: object[]) => rows[0])
//     },
//   },
// }

export default resolvers;

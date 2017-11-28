import { schema } from  'normalizr';

export const beltEntity = new schema.Entity('belts');

export const studentEntity = new schema.Entity('students', {
  belt: beltEntity,
});

export const meetingTypeEntity = new schema.Entity('meeting_types');

export const clsEntity = new schema.Entity('classes', {
  meeting_type: meetingTypeEntity,
  students: new schema.Array(studentEntity),
});

export const clsSchema = {
  belts: [ beltEntity ],
  classes: [ clsEntity ],
  meeting_types: [ meetingTypeEntity ],
  students: [ studentEntity ],
};

export const studentSchema = {
  belts: [ beltEntity ],
  students: [ studentEntity ],
};

export const meetingTypeSchema = { meeting_types: [meetingTypeEntity] };
export const beltSchema = { belts: [ beltEntity ] };

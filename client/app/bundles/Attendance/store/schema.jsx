import { schema } from  'normalizr';

export const meetingTypeEntity = new schema.Entity('meeting_types');

export const clsEntity = new schema.Entity('classes', {
  meeting_type: meetingTypeEntity,
});

export const beltEntity = new schema.Entity('belts');

export const studentEntity = new schema.Entity('students', {
  belt: beltEntity,
});

export const clsSchema = {
  classes: [ clsEntity ],
  meeting_types: [ meetingTypeEntity ],
};

export const studentSchema = {
  students: [ studentEntity ],
  belts: [ beltEntity ],
};

export const meetingTypeSchema = { meeting_types: [meetingTypeEntity] };
export const beltSchema = { belts: [ beltEntity ] };

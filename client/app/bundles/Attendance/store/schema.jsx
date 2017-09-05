import { schema } from  'normalizr';

export const clsEntity = new schema.Entity('classes');

export const beltEntity = new schema.Entity('belts');

export const studentEntity = new schema.Entity('students', {
  belt: beltEntity
});

export const clsSchema = { classes: [ clsEntity ] };

export const studentSchema = {
  students: [ studentEntity ],
  belts: [ beltEntity ],
};

export const beltSchema = { belts: [ beltEntity ] }

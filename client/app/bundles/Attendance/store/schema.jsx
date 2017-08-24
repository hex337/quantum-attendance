import { schema } from  'normalizr';

export const clsEntity = new schema.Entity('classes');

export const studentEntity = new schema.Entity('students');

export const clsSchema = { classes: [ clsEntity ] };

export const studentSchema = { students: [ studentEntity ] };

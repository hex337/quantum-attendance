import { schema } from  'normalizr';

export const clsEntity = new schema.Entity('classes');

//const beltSchema = new schema.Entity('belts', {}, { idAttribute: 'id' });
//const studentSchema = new schema.Entity('students', {}, { idAttribute: 'id' });
export const clsSchema = { classes: [ clsEntity ]};

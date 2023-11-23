import * as Yup from 'yup';

export const schema = Yup.object({
  name: Yup.string().required(),
  time: Yup.string()
    .required()
    .matches(
      /^\d+(\s*hours|\s*minutes)$/,
      'Invalid format. Use numbers followed by "hours" or "minutes"',
    )
    .test(
      'valid-length',
      'Invalid value. Must be less than or equal to 3 hours or 180 minutes and greater than 0 minutes or hours',
      value => {
        if (!value) return false;

        const [numericValue, unit] = value.match(/\d+|\D+/g);
        const numeric = parseInt(numericValue, 10);

        if (unit && unit.trim() === 'hours') {
          return numeric > 0 && numeric <= 3;
        }
        if (unit && unit.trim() === 'minutes') {
          return numeric > 0 && numeric <= 180;
        }

        return false;
      },
    ),
  rating: Yup.number()
    .transform((originalValue, originalObject) => {
      const value = originalObject.rating === '' ? null : originalValue;
      return isNaN(value) ? undefined : value;
    })
    .nullable()
    .min(1, 'Must be greater than or equal to 1')
    .max(10, 'Must be less than or equal to 10')
    .required('rating is a required field'),
}).required();

import { currentDateTime, fetchAPI, generateBookingID } from '../utilities';

export const STAGES = ['Reservation Details', 'Thank You'];
export const OCCASIONS_LIST = [
  {
    id: 1,
    label: 'Birthday',
    value: 'birthday',
  },
  {
    id: 2,
    label: 'Anniversary',
    value: 'anniversary',
  },
  {
    id: 3,
    label: 'Engagement',
    value: 'engagement',
  },
];

export const loadInitialState = () => ({
  availableTimes: fetchAPI(new Date()),
  formData: {
    firstName: '',
    lastName: '',
    bookingDate: currentDateTime(1).date,
    bookingTime: '17:00',
    guests: 1,
    occasion: '',
  },
  formErrors: {
    firstName: '',
    lastName: '',
    bookingDate: '',
    bookingTime: '',
    guests: '',
    occasion: '',
  },
  isDirty: {
    firstName: false,
    lastName: false,
    bookingDate: false,
    bookingTime: false,
    guests: false,
    occasion: false,
  },
  stage: STAGES[0],
  occasions_list: OCCASIONS_LIST,
  booking_id: generateBookingID(),
});

const updateTimes = (state, payload) => ({
  ...state,
  availableTimes: fetchAPI(payload),
});

const setFormData = (state, payload) => ({
  ...state,
  formData: { ...state.formData, ...payload },
});

const setIsDirty = (state, payload) => ({
  ...state,
  isDirty: { ...state.isDirty, ...payload },
});

const setFormErrors = (state, payload) => ({
  ...state,
  formErrors: { ...state.formErrors, ...payload },
});

export const bookingFormReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setAvailableTimes':
      return updateTimes(state, payload);
    case 'setFormData':
      return setFormData(state, payload);
    case 'setIsDirty':
      return setIsDirty(state, payload);
    case 'setFormErrors':
      return setFormErrors(state, payload);
    case 'setStage':
      return { ...state, stage: payload };
    case 'reset':
      return loadInitialState();
    default:
      return state;
  }
};

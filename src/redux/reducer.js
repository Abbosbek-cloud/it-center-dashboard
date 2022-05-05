import { ADD } from "./constants";
import { v4 as uuid4 } from "uuid";

const initialState = {
  students: [
    { id: "", fullname: "", email: "", address: "", password: "", kursi: "" },
  ],
  tutors: [
    {
      id: "",
      tutorname: "",
      teacher: "",
      classrom: "",
    },
  ],
  group: [
    {
      id: "",
      teacher: "",
      classrom: "",
    },
  ],
  isModalVisible: false,
  selected: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      action.payload.form.validateFields().then((values) => {
        delete values.confirm;
        const newArr = [
          ...state.tutors,
          { ...values, id: uuid4().match(/(\d+)/) },
        ];
        return {
          ...state.tutors,
          ...newArr,
        };
      });
  }
};

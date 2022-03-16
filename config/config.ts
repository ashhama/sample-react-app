import FormInputModel from "../models/FormInputModel";
import FormSectionModel from "../models/FormSectionModel";
import ServiceFormModel from "../models/ServiceFormModel";

export const serviceForms = [
  new ServiceFormModel(
    "1",
    "Club Registration Form",
    "club-registration-form",
    [
      new FormSectionModel("General Information", [
        new FormInputModel("name", "Name", "Full Name", "text", 2, true),
        new FormInputModel(
          "club-name",
          "Club Name",
          "Club Name",
          "text",
          2,
          true
        ),
        new FormInputModel(
          "position-in-club",
          "Position in Club",
          "Select Position",
          "select",
          2,
          true,
          [
            "President",
            "Vice president",
            "Secretary",
            "Organising secretary",
            "Treasurer",
            "Support staff",
          ]
        ),
        new FormInputModel(
          "sport",
          "Sport",
          "Select Sport",
          "select",
          2,
          true,
          [
            "Football",
            "Basketball",
            "Volleyball",
            "Netball",
            "Handball",
            "Cricket",
            "Table",
            "Tennis",
            "Badminton",
            "Tennis",
            "Swimming",
            "Athletics",
            "Surfing",
          ]
        ),
        new FormInputModel(
          "street-address",
          "Street Address",
          "House/Apartment, Road",
          "text",
          2,
          true
        ),
        new FormInputModel(
          "island-city",
          "Island/ City",
          "Select Island/ City",
          "select",
          2,
          true,
          [
            "Male City",
            "Addu City",
            "Fuvahmulah City",
            "Kulhudhuffushi City",
            "Th. Thimarafushi",
            "V. Felidhoo",
            "HDh. Hanimaadhoo",
          ]
        ),
        new FormInputModel(
          "contact-number",
          "Contact Number",
          "Contact Number",
          "text",
          1,
          true
        ),
        new FormInputModel("email", "Email", "Email", "email", 1, true),
        new FormInputModel("website", "Website", "Club Website", "text", 2),
      ]),
      new FormSectionModel("Venue Information", [
        new FormInputModel(
          "purpose-built-facility",
          "If not, where do you train/compete?",
          "",
          "radio",
          2, true,
          ['Yes', 'No']
        ), new FormInputModel(
          "train-compete",
          "If not, where do you train/compete?",
          "Address of training/ competition facility",
          "text",
          2
        ), new FormInputModel(
          "facilities-available",
          "Are the facilities available accessible to all?",
          "",
          "radio",
          2, true,
          ['Yes', 'No']
        ),  new FormInputModel(
          "available-for-hire",
          "Is it available for hire?",
          "",
          "radio",
          2, true,
          ['Yes', 'No']
        )
      ]),
      new FormSectionModel("Coaches", [
        new FormInputModel(
          "coaches",
          "How many coaches do you have?",
          "Number of Coaches",
          "text",
          2
        ),
      ]),
    ]
  ),
  ,
  new ServiceFormModel(
    "2",
    "Tournament Registration Form",
    "tournament-registration-form",
    [new FormSectionModel("General Information", [])]
  ),
];

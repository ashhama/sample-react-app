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
          2,
          true,
          ["Yes", "No"]
        ),
        new FormInputModel(
          "train-compete",
          "If not, where do you train/compete?",
          "Address of training/ competition facility",
          "text",
          2
        ),
        new FormInputModel(
          "facilities-available",
          "Are the facilities available accessible to all?",
          "",
          "radio",
          2,
          true,
          ["Yes", "No"]
        ),
        new FormInputModel(
          "available-for-hire",
          "Is it available for hire?",
          "",
          "radio",
          2,
          true,
          ["Yes", "No"]
        ),
      ]),
      new FormSectionModel("Coaches", [
        new FormInputModel(
          "provide-coaching",
          "Does your club provide coaching?",
          "",
          "radio",
          2,
          true,
          ["Yes", "No"]
        ),
        new FormInputModel(
          "number-of-coaches",
          "How many coaches do you have?",
          "Number of Coaches",
          "number",
          2
        ),
        new FormInputModel(
          "coach-level-qualification",
          "What level qualifications do your coaches have?",
          "Provide a brief description of the qualifications your coaches have...",
          "textarea",
          4,
          true
        ),
      ]),
      new FormSectionModel("Training", [
        new FormInputModel(
          "participation-level",
          "What level does your club participate??",
          "",
          "checkbox",
          4,
          true,
          [
            "Social/Recreation",
            "Competitive (Friendly)",
            "Competitive (Local League)",
            "Competitive (National)",
          ]
        ),
        new FormInputModel(
          "club-training-days",
          "Which days does your club train on?",
          "Sunday, Tuesday, Saturday",
          "text",
          2
        ),
        new FormInputModel(
          "monthly-membership-cost",
          "What is the monthly cost of membership? (MVR)",
          "Membership price",
          "number",
          2
        ),
        new FormInputModel(
          "declaration",
          "Declaration",
          "I Agree",
          "declaration",
          4,
          true,
          [],
          "I am the contact for the above club and willing to have my name, address and telephone number in the club directory."
        ),
      ]),
    ]
  ),
  ,
  new ServiceFormModel(
    "2",
    "Tournament Registration Form",
    "tournament-registration-form",
    [
      new FormSectionModel("General Information", [
        new FormInputModel("name", "Name", "Full Name", "text", 2, true),
        new FormInputModel(
          "company",
          "Company Name",
          "Company Name",
          "text",
          2,
          true
        ),
        new FormInputModel(
          "position-in-club",
          "Position In Club",
          "Select Position",
          "select",
          2,
          true,
          [
            "Chairman",
            "Managing Director",
            "Director",
            "Company Secretary",
            "Office",
          ]
        ),
        new FormInputModel("street-address", "Street Address", "House/Apartment, Road", "text", 2, true),
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
          2,
          true
        ),new FormInputModel("email", "Email", "Email", "email", 2, true),
        new FormInputModel("website", "Website", "Club Website", "text", 2)
      ]),
      new FormSectionModel("Tournament Information", [
        new FormInputModel("tournament-title", "Tournament Title", "Tournament Name", "text", 2, true),
        new FormInputModel(
          "sport",
          "Sport",
          "Select Position",
          "select",
          2,
          true,
          [
            "Football", "Basketball", "Volleyball", 
            "Netball", "Handball", "Cricket", 
            "Table Tennis", "Badminton", 
            "Tennis", "Swimming", "Athletics", 
            "Surfing"
          ]
        ), new FormInputModel("purpose-of-tournament", "Purpose of the Tournament", "Provide a brief description of the purpose and objectives of the tournament ...", "textarea", 4),
        new FormInputModel("venue", "Tournament Venue", "Tournament Venue", "text", 2, true), 
        new FormInputModel(
          "target-gender",
          "Target gender",
          "",
          "radio",
          2,
          true,
          ["Male", "Female", "Mixed"]
        )
      ])
    ]
  )
  ]

require 'factory_bot'

@skyward = Company.create!({name: "Skyward Construction"})

@sam_hill = User.create!({
  company: @skyward,
  email: 'user@example.com',
  password: 'password',
  first_name: "Sam",
  last_name: "Hill"
})

FactoryBot.create_list(:user, 25)

@red_fields_lodge = Project.create!({
  company: @skyward,
  name: "Red Fields Lodge",
  start_date: Date.parse("10/10/2022"),
  end_date: Date.parse("1/1/2023"),
  schedule: {
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: 8
  }
})

ProjectUser.create!({
  user: @sam_hill,
  project: @red_fields_lodge
})

Task.create!({
  project: @red_fields_lodge,
  name: "Deep underground",
  start_date: Date.parse("10/10/2022"),
  end_date: Date.parse("25/10/2022")
})
Task.create!({
  project: @red_fields_lodge,
  name: "Set pads",
  start_date: Date.parse("15/10/2022"),
  end_date: Date.parse("29/10/2022")
})
Task.create!({
  project: @red_fields_lodge,
  name: "Rough-in - Building 1",
  start_date: Date.parse("18/10/2022"),
  end_date: Date.parse("23/12/2022")
})
Task.create!({
  project: @red_fields_lodge,
  name: "Trim - Building 1",
  start_date: Date.parse("1/11/2022"),
  end_date: Date.parse("23/12/2022")
})
Task.create!({
  project: @red_fields_lodge,
  name: "Lighting - building 2",
  start_date: Date.parse("7/11/2022"),
  end_date: Date.parse("17/11/2022")
})

Task.create!({
  project: @red_fields_lodge,
  name: "Trim - Building 2",
  start_date: Date.parse("7/12/2022"),
  end_date: Date.parse("17/12/2022")
})

@kpr_hq = Project.create!({
  company: @skyward,
  name: "KPR Headquarters",
  start_date: Date.parse("10/10/2022"),
  end_date: Date.parse("10/10/2025"),
  schedule: {
    days: ["monday", "tuesday", "wednesday", "thursday"],
    hours: 10
  }
})

ProjectUser.create!({
  user: @sam_hill,
  project: @kpr_hq
})

Task.create!({
  project: @kpr_hq,
  name: "Lighting demo",
  start_date: Date.parse("10/10/2022"),
  end_date: Date.parse("25/10/2022")
})
Task.create!({
  project: @kpr_hq,
  name: "Electrical rough",
  start_date: Date.parse("15/10/2022"),
  end_date: Date.parse("31/10/2022")
})
Task.create!({
  project: @kpr_hq,
  name: "Lighting rough",
  start_date: Date.parse("01/11/2022"),
  end_date: Date.parse("23/12/2022")
})
Task.create!({
  project: @kpr_hq,
  name: "Trim",
  start_date: Date.parse("19/12/2022"),
  end_date: Date.parse("25/02/2023")
})
Task.create!({
  project: @kpr_hq,
  name: "Lighting finish",
  start_date: Date.parse("14/07/2023"),
  end_date: Date.parse("25/09/2024")
})
Task.create!({
  project: @kpr_hq,
  name: "turnover and training",
  start_date: Date.parse("14/08/2023"),
  end_date: Date.parse("25/09/2024")
})

@the_zoo = Project.create!({
  company: @skyward,
  name: "The Zoo",
  start_date: Date.parse("26/4/2024"),
  end_date: Date.parse("3/2/2028"),
  schedule: {
    days: ["monday", "tuesday", "wednesday", "thursday"],
    hours: 10
  }
})

FactoryBot.create_list(:task, 50, project: @the_zoo)

ProjectUser.create!({
  user: @sam_hill,
  project: @the_zoo
})

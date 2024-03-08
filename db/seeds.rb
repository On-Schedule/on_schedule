@skyward = Company.create!({name: "Skyward Construction"})

@sam_hill = User.create!({
  company: @skyward,
  email: 'user@example.com',
  password: 'password',
  first_name: "Sam",
  last_name: "Hill"
})

@red_fields_lodge = Project.create!({
  company: @skyward,
  name: "Red Fields Lodge",
  start_date: Date.parse("10/10/2022"),
  end_date: Date.parse("10/10/2025"),
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
  end_date: Date.parse("31/10/2022")
})
Task.create!({
  project: @red_fields_lodge,
  name: "Rough-in - Building 1",
  start_date: Date.parse("01/11/2022"),
  end_date: Date.parse("23/12/2022")
})
Task.create!({
  project: @red_fields_lodge,
  name: "Trim - Building 1",
  start_date: Date.parse("19/12/2022"),
  end_date: Date.parse("25/02/2023")
})
Task.create!({
  project: @red_fields_lodge,
  name: "Lighting - building 2",
  start_date: Date.parse("14/07/2023"),
  end_date: Date.parse("25/09/2024")
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

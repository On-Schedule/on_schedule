@company1 = Company.create!({name: "Company 1"})

@user1 = User.create!({
  company: @company1,
  email: 'user@example.com',
  password: 'password',
  first_name: "Sam",
  last_name: "Hill"
})

@project1 = Project.create!({
  company: @company1,
  name: "Project 1",
  start_date: Date.parse("10/10/2022"),
  end_date: Date.parse("10/10/2025"),
  schedule: {
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    hours: 8
  }
})

ProjectUser.create!({
  user: @user1,
  project: @project1
})

Task.create!({
  project: @project1,
  name: "Task 1",
  start_date: Date.parse("10/10/2022"),
  end_date: Date.parse("25/10/2022")
})
Task.create!({
  project: @project1,
  name: "Task 2",
  start_date: Date.parse("15/10/2022"),
  end_date: Date.parse("31/10/2022")
})
Task.create!({
  project: @project1,
  name: "Task 3",
  start_date: Date.parse("01/11/2022"),
  end_date: Date.parse("23/12/2022")
})
Task.create!({
  project: @project1,
  name: "Task 4",
  start_date: Date.parse("19/12/2022"),
  end_date: Date.parse("25/02/2023")
})
Task.create!({
  project: @project1,
  name: "Task 5",
  start_date: Date.parse("14/07/2023"),
  end_date: Date.parse("25/09/2024")
})
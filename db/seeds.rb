if User.count == 0
  admin = User.create(first_name: "Super", last_name: "Admin", email: "admin@example.com", date_of_birth: "1990-03-09", password: "12345678")
  admin.remove_role :member
  admin.add_role :admin

  users = User.create([
    { first_name: "John", last_name: "Smith", email: "user@example.com", date_of_birth: "1989-04-01", password: "12345678" },
    { first_name: "Britney", last_name: "Spear", email: "member@example.com", date_of_birth: "1989-04-01", password: "12345678" }
  ])
end

if Vendor.count == 0
  Vendor.create([
    { name: "Apple", description: "Apple Inc. is an American multinational corporation headquartered in Cupertino, California"},
    { name: "Samsung", description: "Samsung Inc. is a South Korean multinational conglomerate company headquartered in Samsung Town, Seoul" }
  ])
end

if Category.count == 0
  Category.create([
    { name: "Tablet" },
    { name: "Phone" }
  ])
end
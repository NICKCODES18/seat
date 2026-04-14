const fs = require('fs');
const mongoose = require('mongoose');
const argon2 = require('argon2');
const path = require('path');

async function seed() {
  try {
    // Read local env file
    const envPath = path.join(__dirname, '..', '.env.local');
    const envLocal = fs.readFileSync(envPath, 'utf8');
    const mongoUriMatch = envLocal.match(/MONGO_URI=(.*)/);
    const MONGO_URI = mongoUriMatch ? mongoUriMatch[1].trim() : '';

    if (!MONGO_URI) {
      console.error("❌ MONGO_URI not found in .env.local");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅  Connected to MongoDB");

    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      password: { type: String, required: true },
      squad: { type: Number },
      batch: { type: Number },
      defaultSeat: { type: Number },
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Clear existing users
    await User.deleteMany({});

    const passwordHash = await argon2.hash("Password@123");

    const usersData = [
      { name: "Alice", email: "squad1.alice@example.com", squad: 1, batch: 1, defaultSeat: 1 },
      { name: "Bob", email: "squad1.bob@example.com", squad: 1, batch: 1, defaultSeat: 2 },
      { name: "Charlie", email: "squad1.charlie@example.com", squad: 1, batch: 1, defaultSeat: 3 },
      { name: "Diana", email: "squad1.diana@example.com", squad: 1, batch: 1, defaultSeat: 4 },
      { name: "Ethan", email: "squad1.ethan@example.com", squad: 1, batch: 1, defaultSeat: 5 },
      { name: "Fiona", email: "squad1.fiona@example.com", squad: 1, batch: 1, defaultSeat: 6 },
      { name: "George", email: "squad1.george@example.com", squad: 1, batch: 1, defaultSeat: 7 },
      { name: "Hannah", email: "squad1.hannah@example.com", squad: 1, batch: 1, defaultSeat: 8 },
      { name: "Ivan", email: "squad2.ivan@example.com", squad: 2, batch: 1, defaultSeat: 9 },
      { name: "Julia", email: "squad2.julia@example.com", squad: 2, batch: 1, defaultSeat: 10 },
      { name: "Kevin", email: "squad2.kevin@example.com", squad: 2, batch: 1, defaultSeat: 11 },
      { name: "Laura", email: "squad2.laura@example.com", squad: 2, batch: 1, defaultSeat: 12 },
      { name: "Michael", email: "squad2.michael@example.com", squad: 2, batch: 1, defaultSeat: 13 },
      { name: "Nina", email: "squad2.nina@example.com", squad: 2, batch: 1, defaultSeat: 14 },
      { name: "Oscar", email: "squad2.oscar@example.com", squad: 2, batch: 1, defaultSeat: 15 },
      { name: "Priya", email: "squad2.priya@example.com", squad: 2, batch: 1, defaultSeat: 16 },
      { name: "Quinn", email: "squad3.quinn@example.com", squad: 3, batch: 1, defaultSeat: 17 },
      { name: "Rohan", email: "squad3.rohan@example.com", squad: 3, batch: 1, defaultSeat: 18 },
      { name: "Sara", email: "squad3.sara@example.com", squad: 3, batch: 1, defaultSeat: 19 },
      { name: "Tom", email: "squad3.tom@example.com", squad: 3, batch: 1, defaultSeat: 20 },
      { name: "Uma", email: "squad3.uma@example.com", squad: 3, batch: 1, defaultSeat: 21 },
      { name: "Vivek", email: "squad3.vivek@example.com", squad: 3, batch: 1, defaultSeat: 22 },
      { name: "Wendy", email: "squad3.wendy@example.com", squad: 3, batch: 1, defaultSeat: 23 },
      { name: "Xander", email: "squad3.xander@example.com", squad: 3, batch: 1, defaultSeat: 24 },
      { name: "Yara", email: "squad4.yara@example.com", squad: 4, batch: 1, defaultSeat: 25 },
      { name: "Zara", email: "squad4.zara@example.com", squad: 4, batch: 1, defaultSeat: 26 },
      { name: "Arjun", email: "squad4.arjun@example.com", squad: 4, batch: 1, defaultSeat: 27 },
      { name: "Bella", email: "squad4.bella@example.com", squad: 4, batch: 1, defaultSeat: 28 },
      { name: "Carlos", email: "squad4.carlos@example.com", squad: 4, batch: 1, defaultSeat: 29 },
      { name: "Diya", email: "squad4.diya@example.com", squad: 4, batch: 1, defaultSeat: 30 },
      { name: "Eli", email: "squad4.eli@example.com", squad: 4, batch: 1, defaultSeat: 31 },
      { name: "Fatima", email: "squad4.fatima@example.com", squad: 4, batch: 1, defaultSeat: 32 },
      { name: "Gavin", email: "squad5.gavin@example.com", squad: 5, batch: 1, defaultSeat: 33 },
      { name: "Hana", email: "squad5.hana@example.com", squad: 5, batch: 1, defaultSeat: 34 },
      { name: "Ishaan", email: "squad5.ishaan@example.com", squad: 5, batch: 1, defaultSeat: 35 },
      { name: "Jade", email: "squad5.jade@example.com", squad: 5, batch: 1, defaultSeat: 36 },
      { name: "Kiran", email: "squad5.kiran@example.com", squad: 5, batch: 1, defaultSeat: 37 },
      { name: "Lena", email: "squad5.lena@example.com", squad: 5, batch: 1, defaultSeat: 38 },
      { name: "Mohan", email: "squad5.mohan@example.com", squad: 5, batch: 1, defaultSeat: 39 },
      { name: "Nadia", email: "squad5.nadia@example.com", squad: 5, batch: 1, defaultSeat: 40 },
      { name: "Omar", email: "squad6.omar@example.com", squad: 6, batch: 2, defaultSeat: 1 },
      { name: "Pari", email: "squad6.pari@example.com", squad: 6, batch: 2, defaultSeat: 2 },
      { name: "Rahul", email: "squad6.rahul@example.com", squad: 6, batch: 2, defaultSeat: 3 },
      { name: "Sia", email: "squad6.sia@example.com", squad: 6, batch: 2, defaultSeat: 4 },
      { name: "Tarun", email: "squad6.tarun@example.com", squad: 6, batch: 2, defaultSeat: 5 },
      { name: "Urvi", email: "squad6.urvi@example.com", squad: 6, batch: 2, defaultSeat: 6 },
      { name: "Varun", email: "squad6.varun@example.com", squad: 6, batch: 2, defaultSeat: 7 },
      { name: "Wren", email: "squad6.wren@example.com", squad: 6, batch: 2, defaultSeat: 8 },
      { name: "Xena", email: "squad7.xena@example.com", squad: 7, batch: 2, defaultSeat: 9 },
      { name: "Yash", email: "squad7.yash@example.com", squad: 7, batch: 2, defaultSeat: 10 },
      { name: "Zoe", email: "squad7.zoe@example.com", squad: 7, batch: 2, defaultSeat: 11 },
      { name: "Aarav", email: "squad7.aarav@example.com", squad: 7, batch: 2, defaultSeat: 12 },
      { name: "Bhavi", email: "squad7.bhavi@example.com", squad: 7, batch: 2, defaultSeat: 13 },
      { name: "Cyrus", email: "squad7.cyrus@example.com", squad: 7, batch: 2, defaultSeat: 14 },
      { name: "Deva", email: "squad7.deva@example.com", squad: 7, batch: 2, defaultSeat: 15 },
      { name: "Esha", email: "squad7.esha@example.com", squad: 7, batch: 2, defaultSeat: 16 },
      { name: "Farhan", email: "squad8.farhan@example.com", squad: 8, batch: 2, defaultSeat: 17 },
      { name: "Gopi", email: "squad8.gopi@example.com", squad: 8, batch: 2, defaultSeat: 18 },
      { name: "Hira", email: "squad8.hira@example.com", squad: 8, batch: 2, defaultSeat: 19 },
      { name: "Isha", email: "squad8.isha@example.com", squad: 8, batch: 2, defaultSeat: 20 },
      { name: "Jatin", email: "squad8.jatin@example.com", squad: 8, batch: 2, defaultSeat: 21 },
      { name: "Kavya", email: "squad8.kavya@example.com", squad: 8, batch: 2, defaultSeat: 22 },
      { name: "Lukas", email: "squad8.lukas@example.com", squad: 8, batch: 2, defaultSeat: 23 },
      { name: "Meera", email: "squad8.meera@example.com", squad: 8, batch: 2, defaultSeat: 24 },
      { name: "Nikhil", email: "squad9.nikhil@example.com", squad: 9, batch: 2, defaultSeat: 25 },
      { name: "Oviya", email: "squad9.oviya@example.com", squad: 9, batch: 2, defaultSeat: 26 },
      { name: "Pranav", email: "squad9.pranav@example.com", squad: 9, batch: 2, defaultSeat: 27 },
      { name: "Qasim", email: "squad9.qasim@example.com", squad: 9, batch: 2, defaultSeat: 28 },
      { name: "Riya", email: "squad9.riya@example.com", squad: 9, batch: 2, defaultSeat: 29 },
      { name: "Siddhu", email: "squad9.siddhu@example.com", squad: 9, batch: 2, defaultSeat: 30 },
      { name: "Tara", email: "squad9.tara@example.com", squad: 9, batch: 2, defaultSeat: 31 },
      { name: "Ujwal", email: "squad9.ujwal@example.com", squad: 9, batch: 2, defaultSeat: 32 },
      { name: "Varsha", email: "squad10.varsha@example.com", squad: 10, batch: 2, defaultSeat: 33 },
      { name: "Waqar", email: "squad10.waqar@example.com", squad: 10, batch: 2, defaultSeat: 34 },
      { name: "Xyla", email: "squad10.xyla@example.com", squad: 10, batch: 2, defaultSeat: 35 },
      { name: "Yuvraj", email: "squad10.yuvraj@example.com", squad: 10, batch: 2, defaultSeat: 36 },
      { name: "Zaina", email: "squad10.zaina@example.com", squad: 10, batch: 2, defaultSeat: 37 },
      { name: "Amira", email: "squad10.amira@example.com", squad: 10, batch: 2, defaultSeat: 38 },
      { name: "Biren", email: "squad10.biren@example.com", squad: 10, batch: 2, defaultSeat: 39 },
      { name: "Chloe", email: "squad10.chloe@example.com", squad: 10, batch: 2, defaultSeat: 40 }
    ];

    let createdCount = 0;
    for (const u of usersData) {
      const user = new User({
        ...u,
        password: passwordHash
      });
      await user.save();
      console.log(`  ✅  Created: ${u.name} <${u.email}> — Squad ${u.squad}, Batch ${u.batch}, Seat ${u.defaultSeat}`);
      createdCount++;
    }

    console.log(`\n🌱  Done. Created ${createdCount} users, skipped 0.`);
    console.log(`📝  Default password: "Password@123"`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();

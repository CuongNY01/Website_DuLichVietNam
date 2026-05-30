import { POST as forgotPasswordPOST } from '../app/api/auth/forgot-password/route';
import { POST as resetPasswordPOST } from '../app/api/auth/reset-password/route';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function runTest() {
  console.log("=== STARTING PASSWORD RESET INTEGRATION TEST ===");
  
  // 1. Retrieve the test user
  const user = await prisma.user.findUnique({
    where: { email: 'testuser@gmail.com' }
  });
  if (!user) {
    console.error("ERROR: Test user 'testuser@gmail.com' not found in database.");
    return;
  }
  const originalHash = user.password;
  console.log("1. Original password hash in DB:", originalHash);

  // 2. Call Forgot Password API (mocked Request)
  console.log("2. Sending Forgot Password request...");
  const forgotReq = new Request('http://localhost:3000/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email: 'testuser@gmail.com' }),
    headers: {
      'Content-Type': 'application/json',
      'origin': 'http://localhost:3000'
    }
  });

  const forgotRes = await forgotPasswordPOST(forgotReq);
  const forgotData = await forgotRes.json();
  console.log("   Response status:", forgotRes.status);
  console.log("   Response body:", forgotData);

  if (!forgotData.devLink) {
    console.error("ERROR: devLink was not generated in the response!");
    return;
  }

  // Extract token from devLink URL
  const url = new URL(forgotData.devLink);
  const token = url.searchParams.get('token');
  if (!token) {
    console.error("ERROR: Verification token not found in devLink!");
    return;
  }
  console.log("   Extracted reset token:", token);

  // 3. Call Reset Password API (mocked Request)
  console.log("3. Sending Reset Password request with new password...");
  const resetReq = new Request('http://localhost:3000/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password: 'newpassword123' }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resetRes = await resetPasswordPOST(resetReq);
  const resetData = await resetRes.json();
  console.log("   Response status:", resetRes.status);
  console.log("   Response body:", resetData);

  // 4. Verify password update in database
  const updatedUser = await prisma.user.findUnique({
    where: { email: 'testuser@gmail.com' }
  });
  if (!updatedUser) {
    console.error("ERROR: Failed to retrieve user after update.");
    return;
  }
  
  const isCorrect = await bcrypt.compare('newpassword123', updatedUser.password);
  console.log("4. Verification:");
  console.log("   - Does new password match the DB hash?", isCorrect ? "YES" : "NO");
  console.log("   - Did password hash change in database?", (updatedUser.password !== originalHash) ? "YES" : "NO");

  if (isCorrect && updatedUser.password !== originalHash) {
    console.log("\n=== TEST SUCCESSFUL: Password reset works perfectly! ===");
  } else {
    console.log("\n=== TEST FAILED: Password update check failed! ===");
  }

  // 5. Cleanup: Restore the original password hash to DB
  await prisma.user.update({
    where: { email: 'testuser@gmail.com' },
    data: { password: originalHash }
  });
  console.log("5. Cleanup: Original password hash restored successfully.");
  await prisma.$disconnect();
}

runTest().catch(console.error);

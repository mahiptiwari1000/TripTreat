# ✅ Contributor Checklist

Use this checklist to ensure you have everything set up correctly for contributing to Trip&Treat.

## 🚀 **Initial Setup**

### **1. Repository Setup**
- [ ] Forked the repository
- [ ] Cloned your fork locally
- [ ] Added upstream remote: `git remote add upstream https://github.com/your-username/Trip-Treat-v2.git`

### **2. Environment Setup**
- [ ] Node.js v18+ installed
- [ ] npm or yarn package manager
- [ ] Git configured with your name and email

### **3. Project Dependencies**
- [ ] Ran `npm install` successfully
- [ ] No dependency conflicts or errors

## 🗄️ **Database Setup**

### **4. Supabase Project**
- [ ] Created Supabase account
- [ ] Created new project for development
- [ ] Copied project URL and API key

### **5. Environment Variables**
- [ ] Created `.env.local` file
- [ ] Added `VITE_SUPABASE_URL`
- [ ] Added `VITE_SUPABASE_ANON_KEY`
- [ ] Set `ENABLE_AI_FEATURES=false` (recommended for contributors)
- [ ] Verified no syntax errors

### **6. Database Schema**
- [ ] Ran `npm run db:setup` successfully
- [ ] All tables created without errors
- [ ] Sample data loaded correctly
- [ ] Ran `npm run db:verify` - all checks passed

## 🧪 **Development Environment**

### **7. Application Startup**
- [ ] `npm run dev` starts successfully
- [ ] Application loads at http://localhost:8080
- [ ] No console errors in browser
- [ ] No errors in terminal

### **8. Basic Functionality**
- [ ] Can navigate between pages
- [ ] Can see sample homestays
- [ ] Can view sample images
- [ ] Authentication flow works (if testing)
- [ ] AI itinerary generation works with sample data (no API keys needed)

### **9. Code Quality Tools**
- [ ] `npm run lint` passes without errors
- [ ] `npm run type-check` passes
- [ ] `npm run format:check` passes
- [ ] `npm run test` passes

## 🔧 **Development Workflow**

### **10. Before Making Changes**
- [ ] Pulled latest changes from upstream
- [ ] Created new branch for your feature/fix
- [ ] Verified you're on the correct branch

### **11. While Developing**
- [ ] Code follows project conventions
- [ ] No console.log statements left in code
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code is properly formatted

### **12. Testing Your Changes**
- [ ] All existing tests pass
- [ ] Added new tests for new features
- [ ] Tested manually in browser
- [ ] Verified no regressions

### **13. Before Submitting**
- [ ] Ran `npm run lint:fix` to fix any issues
- [ ] Ran `npm run format` to format code
- [ ] Ran `npm run type-check` to verify types
- [ ] Ran `npm run test` to ensure tests pass
- [ ] Committed changes with descriptive messages
- [ ] Pushed changes to your fork

## 📝 **Pull Request Preparation**

### **14. PR Quality**
- [ ] Clear, descriptive title
- [ ] Detailed description of changes
- [ ] Screenshots/videos if UI changes
- [ ] Linked to relevant issues
- [ ] Follows PR template

### **15. Code Review Readiness**
- [ ] Code is clean and well-commented
- [ ] No debugging code left behind
- [ ] Follows project coding standards
- [ ] Ready for review

## 🚨 **Troubleshooting**

### **Common Issues & Solutions**

#### **Database Connection Issues**
- [ ] Check `.env.local` file exists and has correct values
- [ ] Verify Supabase project is active
- [ ] Run `npm run db:verify` to check setup

#### **Build/Compilation Errors**
- [ ] Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- [ ] Check TypeScript errors: `npm run type-check`
- [ ] Check ESLint issues: `npm run lint`

#### **Test Failures**
- [ ] Run tests individually to identify issues
- [ ] Check if database setup is correct
- [ ] Verify environment variables are set

#### **Git Issues**
- [ ] Ensure you're on the correct branch
- [ ] Pull latest changes from upstream
- [ ] Check for merge conflicts

## 🎯 **Success Criteria**

You're ready to contribute when:
- ✅ All checklist items are completed
- ✅ You can run the app without errors
- ✅ You can make changes and see them reflected
- ✅ All tests pass
- ✅ Code quality tools pass

## 📞 **Need Help?**

If you're stuck on any step:
1. Check the [Database Setup Guide](DATABASE_SETUP.md)
2. Read the [Contributing Guidelines](CONTRIBUTING.md)
3. Search existing issues on GitHub
4. Create a new issue with your specific problem

---

**Happy Contributing! 🚀**

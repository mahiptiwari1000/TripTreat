# Contributing to Trip&Treat

Thank you for your interest in contributing to Trip&Treat! We welcome contributions from the community and are grateful for your help in making this project better.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- **Bug Description**: A clear and concise description of what the bug is
- **Steps to Reproduce**: Detailed steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable, add screenshots to help explain the problem
- **Environment**: Your operating system, browser, and version
- **Additional Context**: Any other context about the problem

### Suggesting Enhancements

We welcome feature requests! Please create an issue with:

- **Feature Description**: A clear and concise description of the feature
- **Use Case**: Describe the problem this feature would solve
- **Proposed Solution**: How you envision this feature working
- **Alternatives**: Any alternative solutions you've considered
- **Additional Context**: Any other context or screenshots about the feature request

## 🚀 Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun
- Git

### Getting Started

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/trip-treat.git
   cd trip-treat
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/original-owner/trip-treat.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

5. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Fill in your environment variables
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Making Changes

### Branch Naming

Use descriptive branch names that indicate the type of change:

- `feature/add-user-dashboard` - New features
- `bugfix/fix-login-error` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/improve-auth-context` - Code refactoring
- `test/add-unit-tests` - Adding tests
- `style/fix-linting-errors` - Code style fixes

### Commit Messages

Follow the conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(auth): add social login functionality

fix(booking): resolve date validation issue

docs(readme): update installation instructions
```

### Code Style

- Follow the existing code style and patterns
- Use TypeScript for all new code
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use proper error handling

### Testing

- Write tests for new features
- Ensure all tests pass before submitting
- Aim for good test coverage
- Test both happy path and edge cases

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting

Ensure your code passes all linting checks:

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your fork**

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write your code
   - Add tests
   - Update documentation if needed

4. **Test your changes**

   ```bash
   npm run test
   npm run lint
   npm run build
   ```

5. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating the Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template
5. Submit the pull request

### PR Template

```markdown
## Description

Brief description of the changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] No hardcoded values
```

## 🎯 Areas for Contribution

### Good First Issues

Look for issues labeled with `good first issue` - these are perfect for newcomers!

### Areas We Need Help With

- **Testing**: Adding unit tests, integration tests, and E2E tests
- **Documentation**: Improving docs, adding examples, creating guides
- **Accessibility**: Making the app more accessible
- **Performance**: Optimizing loading times and bundle size
- **Mobile**: Improving mobile experience
- **Internationalization**: Adding multi-language support
- **UI/UX**: Improving user interface and experience

### Code Quality

- **TypeScript**: Improving type safety
- **Error Handling**: Better error boundaries and handling
- **Performance**: Optimizing components and queries
- **Security**: Security improvements and best practices

## 🐛 Bug Fixes

When fixing bugs:

1. **Reproduce the bug** - Make sure you can reproduce it consistently
2. **Write a test** - Add a test that fails before your fix
3. **Fix the bug** - Implement the fix
4. **Verify the fix** - Ensure the test now passes
5. **Test edge cases** - Make sure your fix doesn't break other functionality

## ✨ Feature Development

When adding features:

1. **Discuss first** - Open an issue to discuss the feature
2. **Plan the implementation** - Break it down into smaller tasks
3. **Start small** - Implement the core functionality first
4. **Add tests** - Write comprehensive tests
5. **Update documentation** - Update relevant docs
6. **Consider accessibility** - Ensure the feature is accessible

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)

## 💬 Getting Help

- **Discord**: Join our community Discord
- **GitHub Discussions**: Use GitHub Discussions for questions
- **Issues**: Open an issue for bugs or feature requests

## 🙏 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Trip&Treat! 🎉

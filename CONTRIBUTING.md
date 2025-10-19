# Contributing to react-native-grid-system

Thank you for your interest in contributing! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/rn-grid.git
   cd rn-grid
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

## Development Workflow

### Running Tests

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

### Building

```bash
npm run build
```

This compiles TypeScript files to the `dist/` directory.

### Linting

```bash
npm run lint
```

## Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Add JSDoc comments for public APIs
- Keep functions small and focused
- Write descriptive variable and function names

## Testing Guidelines

- Write tests for all new features
- Maintain or improve code coverage
- Test edge cases and error conditions
- Use descriptive test names

Example test structure:

```typescript
describe('ComponentName', () => {
  it('should handle specific behavior', () => {
    // Arrange
    const input = ...;

    // Act
    const result = ...;

    // Assert
    expect(result).toBe(...);
  });
});
```

## Commit Guidelines

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:

```
feat: add support for minmax() in track sizing
fix: correct auto-placement algorithm for dense packing
docs: update README with new examples
```

## Pull Request Process

1. **Create a branch** for your feature:

   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make your changes** and commit them:

   ```bash
   git commit -m "feat: add new feature"
   ```

3. **Push to your fork**:

   ```bash
   git push origin feat/my-new-feature
   ```

4. **Open a Pull Request** on GitHub

5. **Describe your changes** clearly:

   - What problem does it solve?
   - How does it work?
   - Are there any breaking changes?
   - Include examples if applicable

6. **Ensure CI passes**:
   - All tests must pass
   - Code coverage should not decrease
   - Linting should pass

## Reporting Issues

When reporting issues, please include:

- React Native version
- Platform (iOS, Android, Web)
- Minimal reproduction code
- Expected vs actual behavior
- Screenshots if applicable

## Feature Requests

We welcome feature requests! Please:

- Check if it already exists
- Explain the use case
- Provide examples if possible
- Discuss implementation approach

## Questions?

Feel free to open an issue for questions or discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to make this project better!

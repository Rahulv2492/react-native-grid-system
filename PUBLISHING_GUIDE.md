# Publishing to npm - Step by Step Guide

## Prerequisites

1. **npm account** - Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **Email verified** - Verify your npm email address
3. **2FA enabled** (recommended) - Set up two-factor authentication

## Step 1: Check Package Name Availability

```bash
npm search react-native-grid-system
```

If the name is taken, you'll need to:

- Use a scoped package: `@your-username/react-native-grid-system`
- Choose a different name

## Step 2: Login to npm

```bash
npm login
```

Enter your:

- Username
- Password
- Email
- OTP (if 2FA is enabled)

Verify you're logged in:

```bash
npm whoami
```

## Step 3: Verify Package Configuration

Check your `package.json`:

```bash
cat package.json | grep -E "name|version|main|types|files"
```

Make sure:

- ✅ `name`: "react-native-grid-system" (or your chosen name)
- ✅ `version`: "1.0.0"
- ✅ `main`: "dist/index.js"
- ✅ `types`: "dist/index.d.ts"
- ✅ `files`: includes "dist" and other needed files

## Step 4: Clean Build

```bash
# Remove old build
rm -rf dist/

# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Build the package
npm run build
```

## Step 5: Test the Package Locally

Test before publishing:

```bash
# Create a test package
npm pack

# This creates: react-native-grid-system-1.0.0.tgz
# Check the contents:
tar -tzf react-native-grid-system-1.0.0.tgz | head -20
```

**Verify the package includes:**

- ✅ dist/ (compiled code)
- ✅ src/ (TypeScript source)
- ✅ examples/
- ✅ README.md
- ✅ LICENSE
- ❌ NOT node_modules/
- ❌ NOT .git/
- ❌ NOT assets/ (excluded in .npmignore)

## Step 6: Dry Run (Recommended)

Test publishing without actually publishing:

```bash
npm publish --dry-run
```

This shows exactly what will be published. Review the output carefully.

## Step 7: Publish to npm

### For Public Package (Free):

```bash
npm publish --access public
```

### For Scoped Package:

```bash
npm publish --access public
```

You'll see output like:

```
+ react-native-grid-system@1.0.0
```

## Step 8: Verify Publication

Check your package is live:

```bash
# View on npm registry
npm view react-native-grid-system

# Or visit:
# https://www.npmjs.com/package/react-native-grid-system
```

## Step 9: Test Installation

Test installing your published package:

```bash
# In a different directory
cd /tmp
mkdir test-install
cd test-install
npm init -y
npm install react-native-grid-system
```

Verify it installed correctly:

```bash
ls node_modules/react-native-grid-system/dist/
```

## Step 10: Update GitHub Repository

After successful publication:

```bash
# Tag the release
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

## Common Issues & Solutions

### Issue 1: "Package name already exists"

**Solution:** Use a scoped package name in `package.json`:

```json
{
  "name": "@your-username/react-native-grid-system"
}
```

### Issue 2: "You must verify your email"

**Solution:**

1. Go to npmjs.com
2. Check your email for verification link
3. Click to verify
4. Try publishing again

### Issue 3: "You do not have permission to publish"

**Solution:**

```bash
npm logout
npm login
npm publish --access public
```

### Issue 4: "402 Payment Required"

**Solution:** You're trying to publish a scoped private package. Either:

- Make it public: `npm publish --access public`
- Upgrade to npm Pro for private packages

### Issue 5: Package too large

**Solution:** Check what's being included:

```bash
npm pack --dry-run
```

Update `.npmignore` to exclude unnecessary files.

## Publishing Updates

For future versions:

```bash
# Update version (choose one):
npm version patch  # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor  # 1.0.0 -> 1.1.0 (new features)
npm version major  # 1.0.0 -> 2.0.0 (breaking changes)

# Build and publish
npm run build
npm publish

# Push git tags
git push origin main --tags
```

## Best Practices

1. ✅ **Always test locally** with `npm pack` before publishing
2. ✅ **Use semantic versioning** (major.minor.patch)
3. ✅ **Update CHANGELOG.md** before each release
4. ✅ **Tag releases** in git
5. ✅ **Keep README updated** with installation instructions
6. ✅ **Test in a fresh project** after publishing
7. ✅ **Enable 2FA** on your npm account for security

## Quick Checklist

Before running `npm publish`:

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Package.json is correct (name, version, etc.)
- [ ] README.md is up-to-date
- [ ] CHANGELOG.md is updated
- [ ] LICENSE file exists
- [ ] .npmignore excludes unnecessary files
- [ ] Logged into npm: `npm whoami`
- [ ] Dry run successful: `npm publish --dry-run`

## After Publishing

1. ✅ Check the package page: https://www.npmjs.com/package/react-native-grid-system
2. ✅ Test installation in a fresh project
3. ✅ Create a GitHub release with the same version tag
4. ✅ Share on social media / Reddit / Dev.to
5. ✅ Add npm badge to README (it's already there!)

---

## Ready to Publish?

Run these commands in order:

```bash
# 1. Login
npm login

# 2. Build
npm run build

# 3. Dry run (check what will be published)
npm publish --dry-run

# 4. Publish!
npm publish --access public

# 5. Verify
npm view react-native-grid-system

# 6. Tag the release
git tag v1.0.0
git push origin main --tags
```

🎉 **Congratulations!** Your package is now live on npm!

export default {
  branches: ['main'], // Specify which branches trigger releases
  plugins: [
    '@semantic-release/commit-analyzer', // Analyze commits to determine version bump
    '@semantic-release/release-notes-generator', // Generate release notes from commit messages
    ['@semantic-release/changelog', { changelogTitle: '# Changelog', changelogFile: 'CHANGELOG.md' }],
    '@semantic-release/npm', // Publish release to npm
    '@semantic-release/github', // Publish release to GitHub
    [
      '@semantic-release/git',
      {
        assets: ['dist/**/*.js', 'package.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
  ],
};

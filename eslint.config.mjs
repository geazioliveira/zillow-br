import nx from '@nx/eslint-plugin'
import pluginImport from 'eslint-plugin-import'

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      import: pluginImport,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:api',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:api'],
            },
          ],
        },
      ],
      // Enforce import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js builtins
            'external', // npm libraries
            'libs',
            'internal', // Your aliases (e.g. @app/*)
            ['parent', 'sibling', 'index'], // Relative imports
          ],
          pathGroups: [
            {
              pattern: '@/mui', // <-- adjust if you use tsconfig paths
              group: 'external',
            },
            {
              pattern: '@libs/**',
              group: 'libs',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc', // ascending
            caseInsensitive: true,
          },
          'newlines-between': 'always', // enforce blank line between groups
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
]

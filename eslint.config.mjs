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
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
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
            'internal', // Your aliases (e.g. @app/*)
            ['parent', 'sibling', 'index'], // Relative imports
          ],
          pathGroups: [
            {
              pattern: '@/mui', // <-- adjust if you use tsconfig paths
              group: 'external',
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

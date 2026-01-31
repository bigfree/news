import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: false,
    stylistic: false,
  },
}).overrideRules({
  'prettier/prettier': 'error',
  'import/first': 'off',
  'import/order': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/max-attributes-per-line': ['error', { singleline: 5 }],
  'vue/html-self-closing': [
    'error',
    {
      html: {
        void: 'always', // <img />, <br />, etc.
        normal: 'always', // <div /> instead of <div></div> when empty
        component: 'always', // <MyComponent /> instead of <MyComponent></MyComponent>
      },
      svg: 'always',
      math: 'always',
    },
  ],
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  'vue/no-v-html': 'off',
  'vue/attribute-hyphenation': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/no-unused-expressions': [
    'error',
    {
      allowShortCircuit: false,
      allowTernary: true,
    },
  ],
})

import { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('ui-component', {
    description: 'Creates a new ui component and the associated storybook files',
    prompts: [
      {
        type: 'input',
        name: 'file',
        message: 'What is the name of the new component to create?',
        validate: (input: string) => {
          if (input.includes('.')) {
            return 'file name cannot include an extension';
          }
          if (input.includes(' ')) {
            return 'file name cannot include spaces';
          }
          if (!input) {
            return 'file name is required';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'htmlElement',
        message: 'What should be the html element of the new component? This will be the root element of the component.',
      },
      {
        type: 'checkbox',
        name: 'stateful',
        message: 'Should the component be stateful?',
        choices: ['Yes', 'No'],
      },
      {
        type: 'checkbox',
        name: 'hasMotion',
        message: 'Should the component use motion?',
        choices: ['Yes', 'No'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/packages/ui-kit/src/components/{{ title }}/index.tsx',
        templateFile: 'templates/ui-component.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/packages/storybook/src/stories/{{ pascalCase title }}/{{ pascalCase title }}.stories.ts',
        templateFile: 'templates/ui-component-story.hbs',
      },
    ],
  });
}

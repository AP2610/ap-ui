import { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper('getComponentProps', (hasChildren: boolean, hasVariant: boolean, hasMotion: boolean) => {
    const props = ['className', 'ref'];

    if (hasMotion) {
      props.push('motionProps', 'animate');
    }

    if (hasVariant) {
      props.push('variant', 'size');
    }

    if (hasChildren) {
      props.push('children');
    }

    props.push('...props');

    return `{${props.join(', ')}}`;
  });

  plop.setHelper(
    'getComponentInterface',
    (hasChildren: boolean, hasVariant: boolean, htmlElement: string, componentName: string) => {
      const elementType = plop.getHelper('getRefType')(htmlElement);

      if (hasChildren && hasVariant) {
        return `ComponentPropsWithChildren<${componentName}PropsType, ${elementType}, ${componentName}Variants>`;
      }
      if (hasChildren) {
        return `ComponentPropsWithChildren<${componentName}PropsType, ${elementType}>`;
      }
      if (hasVariant) {
        return `ComponentPropsWithoutChildren<${elementType}, ${componentName}Variants>`;
      }
      return `ComponentPropsWithoutChildren<${elementType}>`;
    },
  );

  plop.setHelper('getRefType', (htmlElement: string) => {
    const refTypes: Record<string, string> = {
      button: 'HTMLButtonElement',
      div: 'HTMLDivElement',
      input: 'HTMLInputElement',
      form: 'HTMLFormElement',
      section: 'HTMLElement',
      article: 'HTMLElement',
      header: 'HTMLElement',
      footer: 'HTMLElement',
      main: 'HTMLElement',
      nav: 'HTMLElement',
      aside: 'HTMLElement',
      p: 'HTMLParagraphElement',
      h1: 'HTMLHeadingElement',
      h2: 'HTMLHeadingElement',
      h3: 'HTMLHeadingElement',
      h4: 'HTMLHeadingElement',
      h5: 'HTMLHeadingElement',
      h6: 'HTMLHeadingElement',
      a: 'HTMLAnchorElement',
      img: 'HTMLImageElement',
      ul: 'HTMLUListElement',
      ol: 'HTMLOListElement',
      li: 'HTMLLIElement',
      table: 'HTMLTableElement',
      tr: 'HTMLTableRowElement',
      td: 'HTMLTableCellElement',
      th: 'HTMLTableCellElement',
      textarea: 'HTMLTextAreaElement',
      select: 'HTMLSelectElement',
      option: 'HTMLOptionElement',
      label: 'HTMLLabelElement',
      fieldset: 'HTMLFieldSetElement',
      legend: 'HTMLLegendElement',
    };

    return refTypes[htmlElement] || 'HTMLElement';
  });

  plop.setGenerator('component', {
    description: 'Creates a new ui component and the associated storybook files',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of the new component to create?',
        validate: (input: string) => {
          if (input.includes('.')) {
            return 'component name cannot include an extension';
          }
          if (input.includes(' ')) {
            return 'component name cannot include spaces';
          }
          if (!input) {
            return 'component name is required';
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
        type: 'confirm',
        name: 'stateful',
        message: 'Should the component be stateful?',
      },
      {
        type: 'confirm',
        name: 'hasMotion',
        message: 'Should the component use motion?',
      },
      {
        type: 'confirm',
        name: 'hasVariant',
        message: 'Should the component have variants?',
      },
      {
        type: 'confirm',
        name: 'hasChildren',
        message: 'Should the component have children?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/packages/ui-kit/src/components/{{ componentName }}/index.tsx',
        templateFile: 'templates/ui-component.hbs',
      },
      {
        type: 'add',
        path: '{{ turbo.paths.root }}/packages/storybook/src/stories/{{ componentName }}/{{ pascalCase componentName }}.stories.ts',
        templateFile: 'templates/ui-component-story.hbs',
      },
    ],
  });
}

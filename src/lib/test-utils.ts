import { Test, TestParent, TestType } from '../types';
import TestTreeItem from '../treeviews/test-tree-item';

export const last = (items: TestParent) => Object.values(items).slice(-1)[0];

export const reset = (items: TestParent, value: number) => {
  for (let i in items) {
    Number(i) > value && delete items[i];
  }
};

export const setHierarchy = (tests: Test[]): Test[] => {
  let previous = -1;
  const parents: TestParent = {};
  const orderedTests = [...tests];

  orderedTests.forEach((test: Test) => {
    const current = test.range.start.character;
    const parent = parents[current];

    current < previous && reset(parents, current);

    test.parent = parent ? tests[parent].parent : last(parents);

    parents[current] = test.id;
    previous = current;
  });

  return orderedTests;
};

const defaultTreeItem: TestTreeItem = new TestTreeItem({
  id: undefined,
  name: '',
  range: null,
  type: TestType.DESCRIBE
});

export const asTree = (items: TestTreeItem[], parent: TestTreeItem = defaultTreeItem, tree: TestTreeItem[] = []) => {
  const children = items.filter(child => child.parentID === parent.id);

  if (children.length > 0) {
    parent.id === 'undefined' ? (tree = children) : (parent.children = children);
    children.forEach(child => asTree(items, child, tree));
  }

  return tree;
};

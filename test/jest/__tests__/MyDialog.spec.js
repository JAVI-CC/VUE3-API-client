import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import CustomDialog from './demo/MyDialog';

installQuasarPlugin();

describe('MyDialog', () => {
  it('should mount MyDialog', () => {
    const wrapper = mount(CustomDialog, {
      data: () => ({
        isDialogOpen: true,
      }),
    });

    expect(wrapper.exists()).toBe(true);
  });
});

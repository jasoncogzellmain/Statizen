import { open } from '@tauri-apps/plugin-dialog';

export async function handleOpenFile() {
  const selectedPath = await open({
    multiple: false,
    filters: [
      {
        name: 'Log Files',
        extensions: ['log'],
      },
    ],
  });

  if (selectedPath) {
    console.log('Selected file:', selectedPath);
    return selectedPath;
  }
}

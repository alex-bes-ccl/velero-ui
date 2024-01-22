'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Stack,
  Space,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons-react';

export function AuthenticationForm() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (val) => (val.length < 1 ? 'Username can not empty' : null),
      password: (val) => (val.length < 1 ? 'Password can not empty' : null),
    },
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    form.clearErrors();
    const formData = new FormData();
    formData.append('username', form.values.username);
    formData.append('password', form.values.password);
    const res = await fetch(`${process.env.NEXT_PUBLIC_VELERO_API_URL}/api/v1/token`, {
      method: 'POST',
      body: formData,
    });
    if (res.status === 200) {
      const json = await res.json();
      localStorage.setItem('token', json.access_token);
      router.push('/dashboard');
    } else {
      form.setErrors({ username: true, password: true });
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder style={{ width: '100%', border: 'none' }} mt="10rem">
      <Text size="22px" fw={800} c={colorScheme === 'light' ? 'dark' : 'white'}>
        Velero UI
      </Text>
      <Text style={{ fontSize: '12px', marginTop: '2%' }} c="dimmed">
        Backup Simplified
      </Text>

      <Space h="xl" />

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            variant="filled"
            leftSection={
              <ActionIcon variant="outline" color="blue" p={4} tabIndex={-1}>
                <IconUser />
              </ActionIcon>
            }
            size="md"
            style={{ marginTop: '8%' }}
            required
            placeholder="Your username"
            value={form.values.username}
            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
            error={form.errors.username && 'Login failed!'}
          />

          <PasswordInput
            variant="filled"
            leftSection={
              <ActionIcon variant="outline" color="blue" p={4} tabIndex={-1}>
                <IconLock />
              </ActionIcon>
            }
            size="md"
            required
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Login failed!'}
          />
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button fullWidth type="submit">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

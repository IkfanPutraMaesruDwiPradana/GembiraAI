# API Documentation - GEMBIRA AI Backend Services

Dokumentasi lengkap untuk semua backend services yang tersedia.

## Table of Contents
- [Authentication Service](#authentication-service)
- [User Service](#user-service)
- [Reflection Service](#reflection-service)
- [Literacy Service](#literacy-service)
- [Project Service](#project-service)
- [Community Service](#community-service)

---

## Authentication Service
**File**: `services/authService.ts`

### registerUser()
Mendaftarkan user baru dengan email dan password.

**Parameters:**
- `email: string` - Email user
- `password: string` - Password (min 6 karakter)
- `name: string` - Nama lengkap
- `university: string` - Nama universitas
- `major: string` - Jurusan

**Returns:** `Promise<AuthResponse>`

**Example:**
```typescript
import { registerUser } from './services/authService';

const result = await registerUser(
  'user@example.com',
  'password123',
  'John Doe',
  'Universitas Indonesia',
  'Teknik Informatika'
);

if (result.success) {
  console.log('User registered:', result.user);
} else {
  console.error('Error:', result.error);
}
```

### loginUser()
Login user dengan email dan password.

**Parameters:**
- `email: string`
- `password: string`

**Returns:** `Promise<AuthResponse>`

**Example:**
```typescript
import { loginUser } from './services/authService';

const result = await loginUser('user@example.com', 'password123');
if (result.success) {
  setUser(result.user);
}
```

### logoutUser()
Logout user yang sedang login.

**Returns:** `Promise<{ success: boolean; error?: string }>`

### getCurrentUser()
Mendapatkan data user yang sedang login.

**Returns:** `Promise<AuthResponse>`

---

## User Service
**File**: `services/userService.ts`

### getUserProfile()
Mendapatkan profile user berdasarkan ID.

**Parameters:**
- `userId: string`

**Returns:** `Promise<UserProfile | null>`

### updateUserProfile()
Update profile user.

**Parameters:**
- `userId: string`
- `updates: { name?, university?, major?, avatar_color? }`

**Returns:** `Promise<{ success: boolean; user?: UserProfile; error?: string }>`

**Example:**
```typescript
import { updateUserProfile } from './services/userService';

const result = await updateUserProfile(userId, {
  name: 'New Name',
  university: 'New University'
});
```

### addUserXP()
Menambahkan XP ke user dan update level otomatis.

**Parameters:**
- `userId: string`
- `xpAmount: number`

**Returns:** `Promise<{ success: boolean; newXP?: number; newLevel?: number; error?: string }>`

**Example:**
```typescript
import { addUserXP } from './services/userService';

// User menyelesaikan topik dengan reward 15 XP
const result = await addUserXP(userId, 15);
console.log('New XP:', result.newXP);
console.log('New Level:', result.newLevel);
```

### getUserBadges()
Mendapatkan semua badges yang dimiliki user.

**Parameters:**
- `userId: string`

**Returns:** `Promise<string[]>`

### awardBadge()
Memberikan badge ke user.

**Parameters:**
- `userId: string`
- `badgeName: string`

**Returns:** `Promise<{ success: boolean; error?: string }>`

---

## Reflection Service
**File**: `services/reflectionService.ts`

### saveReflection()
Menyimpan entry refleksi baru.

**Parameters:**
- `userId: string`
- `answers: Record<string, string>` - Object berisi jawaban refleksi
- `aiAnalysis?: string` - Analisis dari AI (optional)

**Returns:** `Promise<{ success: boolean; reflection?: ReflectionEntry; error?: string }>`

**Example:**
```typescript
import { saveReflection } from './services/reflectionService';

const answers = {
  'question1': 'Saya belajar tentang...',
  'question2': 'Saya merasa...',
  'question3': 'Besok saya akan...'
};

const result = await saveReflection(userId, answers, aiAnalysisText);
```

### getUserReflections()
Mendapatkan semua refleksi user.

**Parameters:**
- `userId: string`

**Returns:** `Promise<ReflectionEntry[]>`

### updateReflectionAnalysis()
Update AI analysis pada refleksi yang sudah ada.

**Parameters:**
- `reflectionId: string`
- `aiAnalysis: string`

**Returns:** `Promise<{ success: boolean; error?: string }>`

### deleteReflection()
Menghapus entry refleksi.

**Parameters:**
- `reflectionId: string`

**Returns:** `Promise<{ success: boolean; error?: string }>`

---

## Literacy Service
**File**: `services/literacyService.ts`

### getLiteracyTopics()
Mendapatkan semua topik literasi yang aktif.

**Returns:** `Promise<LiteracyTopic[]>`

**Example:**
```typescript
import { getLiteracyTopics } from './services/literacyService';

const topics = await getLiteracyTopics();
topics.forEach(topic => {
  console.log(topic.title, '-', topic.xpReward, 'XP');
});
```

### getUserLiteracyProgress()
Mendapatkan progress literasi user.

**Parameters:**
- `userId: string`

**Returns:** `Promise<any[]>`

### completeTopic()
Menandai topik sebagai selesai dan memberikan XP.

**Parameters:**
- `userId: string`
- `topicId: string`
- `notes?: string` - Catatan optional

**Returns:** `Promise<{ success: boolean; xpEarned?: number; error?: string }>`

**Example:**
```typescript
import { completeTopic } from './services/literacyService';
import { addUserXP } from './services/userService';

const result = await completeTopic(userId, topicId, 'Topik sangat menarik!');
if (result.success && result.xpEarned) {
  // Add XP to user
  await addUserXP(userId, result.xpEarned);
}
```

### isTopicCompleted()
Cek apakah topik sudah diselesaikan user.

**Parameters:**
- `userId: string`
- `topicId: string`

**Returns:** `Promise<boolean>`

---

## Project Service
**File**: `services/projectService.ts`

### createProject()
Membuat project baru.

**Parameters:**
- `userId: string`
- `title: string`
- `description?: string`
- `content?: string`

**Returns:** `Promise<{ success: boolean; project?: Project; error?: string }>`

**Example:**
```typescript
import { createProject } from './services/projectService';

const result = await createProject(
  userId,
  'Analisis Etika AI',
  'Project tentang implikasi etis AI',
  'Draft content...'
);
```

### getUserProjects()
Mendapatkan semua project user.

**Parameters:**
- `userId: string`

**Returns:** `Promise<Project[]>`

### updateProject()
Update project yang sudah ada.

**Parameters:**
- `projectId: string`
- `updates: { title?, description?, content?, status?, aiFeedback? }`

**Returns:** `Promise<{ success: boolean; project?: Project; error?: string }>`

**Example:**
```typescript
import { updateProject } from './services/projectService';

// Submit project
await updateProject(projectId, {
  status: 'submitted',
  content: finalContent
});
```

### deleteProject()
Menghapus project.

**Parameters:**
- `projectId: string`

**Returns:** `Promise<{ success: boolean; error?: string }>`

---

## Community Service
**File**: `services/communityService.ts`

### createPost()
Membuat post komunitas baru.

**Parameters:**
- `userId: string`
- `title: string`
- `content: string`
- `category?: string` - Default: 'general'

**Returns:** `Promise<{ success: boolean; post?: CommunityPost; error?: string }>`

**Example:**
```typescript
import { createPost } from './services/communityService';

const result = await createPost(
  userId,
  'Bagaimana AI mengubah pendidikan?',
  'Menurut saya AI akan...',
  'discussion'
);
```

### getPosts()
Mendapatkan posts dengan pagination.

**Parameters:**
- `currentUserId?: string` - Untuk cek like status
- `category?: string` - Filter by category
- `limit?: number` - Default: 20
- `offset?: number` - Default: 0

**Returns:** `Promise<CommunityPost[]>`

**Example:**
```typescript
import { getPosts } from './services/communityService';

// Get first 20 posts
const posts = await getPosts(userId, 'all', 20, 0);

// Get next 20 posts
const morePosts = await getPosts(userId, 'all', 20, 20);
```

### likePost()
Like sebuah post.

**Parameters:**
- `userId: string`
- `postId: string`

**Returns:** `Promise<{ success: boolean; error?: string }>`

### unlikePost()
Unlike sebuah post.

**Parameters:**
- `userId: string`
- `postId: string`

**Returns:** `Promise<{ success: boolean; error?: string }>`

### addComment()
Menambahkan comment ke post.

**Parameters:**
- `userId: string`
- `postId: string`
- `content: string`

**Returns:** `Promise<{ success: boolean; comment?: Comment; error?: string }>`

### getPostComments()
Mendapatkan semua comments untuk sebuah post.

**Parameters:**
- `postId: string`

**Returns:** `Promise<Comment[]>`

---

## Error Handling

Semua service methods mengembalikan object dengan struktur:
```typescript
{
  success: boolean;
  data?: any;  // Jika berhasil
  error?: string;  // Jika gagal
}
```

**Best Practice:**
```typescript
const result = await someServiceMethod();

if (result.success) {
  // Handle success
  console.log('Success:', result.data);
} else {
  // Handle error
  console.error('Error:', result.error);
  // Show error to user
  alert(result.error);
}
```

## Authentication State

Untuk mendapatkan current user ID:
```typescript
import { supabase } from './services/supabaseClient';

const { data: { user } } = await supabase.auth.getUser();
const userId = user?.id;
```

## Real-time Subscriptions (Advanced)

Supabase mendukung real-time updates. Contoh untuk listen perubahan pada community posts:

```typescript
import { supabase } from './services/supabaseClient';

const subscription = supabase
  .channel('community_posts')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'community_posts' },
    (payload) => {
      console.log('New post:', payload.new);
      // Update UI
    }
  )
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

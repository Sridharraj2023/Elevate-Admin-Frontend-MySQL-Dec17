# Frontend MySQL Migration Changes

## Critical Changes Required

### 1. **Primary Key Change: `_id` → `id`**

**MongoDB (Old):**
```javascript
user._id
category._id
music._id
```

**MySQL/Sequelize (New):**
```javascript
user.id
category.id
music.id
```

### 2. **Files to Update**

#### Admin Pages:
- ✅ `ViewUsers.jsx` - Update all `_id` to `id`
- ✅ `ViewCategories.jsx` - Update all `_id` to `id`
- ✅ `ViewMusic.jsx` - Update all `_id` to `id`
- ✅ `AddCategory.jsx` - Update response handling
- ✅ `AddMusic.jsx` - Update response handling
- ✅ `ManageSubscriptionPlans.jsx` - Update all `_id` to `id`
- ✅ `ManageTermsConditions.jsx` - Update all `_id` to `id`
- ✅ `ManageDisclaimer.jsx` - Update all `_id` to `id`

#### User Pages:
- ✅ All user-facing components

### 3. **Backend Configuration**

**Current Backend:**
- Base URL: `http://192.168.0.100:5000`
- Database: MySQL on port 3307
- All models use UUID primary keys

**Frontend .env:**
```env
VITE_API_URL=http://192.168.0.100:5000/api
```

### 4. **Key Model Changes**

#### User Model:
```javascript
// OLD (MongoDB)
{
  _id: ObjectId,
  name: String,
  email: String,
  // ...
}

// NEW (MySQL)
{
  id: UUID,
  name: String,
  email: String,
  // ...
}
```

#### Category Model:
```javascript
// OLD (MongoDB)
{
  _id: ObjectId,
  name: String,
  types: [{ _id: ObjectId, name: String }]
}

// NEW (MySQL)
{
  id: UUID,
  name: String,
  types: [{ id: UUID, name: String }] // JSON field
}
```

### 5. **Search & Replace Pattern**

**Global replacements needed:**
```javascript
// User references
user._id → user.id
(user) => user._id → (user) => user.id
cat._id → cat.id
music._id → music.id
type._id → type.id

// Filter operations
.filter((user) => user._id !== userId) → .filter((user) => user.id !== userId)
.map((cat) => (cat._id === id ? res.data : cat)) → .map((cat) => (cat.id === id ? res.data : cat))

// Key props
key={user._id} → key={user.id}
data-category-id={category._id} → data-category-id={category.id}
```

### 6. **API Endpoint Changes**

No changes needed - endpoints remain the same:
```javascript
/api/users/${userId}
/api/categories/${categoryId}
/api/music/${musicId}
```

### 7. **Date Handling**

Both MongoDB and MySQL return ISO date strings, so no changes needed:
```javascript
new Date(user.createdAt) // Works for both
```

### 8. **JSON Fields**

MySQL stores these as JSON (same structure):
- `user.subscription` - Subscription details
- `user.notificationPreferences` - Notification settings
- `category.types` - Category types array

### 9. **Testing Checklist**

After updates, test:
- [ ] User login/signup
- [ ] View users list
- [ ] Delete user
- [ ] View user details modal
- [ ] Add category
- [ ] Edit category
- [ ] Delete category
- [ ] Add music
- [ ] Edit music
- [ ] Delete music
- [ ] Subscription plans CRUD
- [ ] Terms & conditions management
- [ ] Search functionality
- [ ] Pagination
- [ ] Sorting

### 10. **Environment Setup**

**Backend (.env):**
```env
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=
DB_NAME=elevate_music
```

**Frontend (.env):**
```env
VITE_API_URL=http://192.168.0.100:5000/api
```

## Implementation Steps

1. ✅ Update `.env` with correct backend URL
2. ✅ Update all admin pages (`_id` → `id`)
3. ✅ Update all user pages (`_id` → `id`)
4. ✅ Test all CRUD operations
5. ✅ Verify search and filters work
6. ✅ Check pagination
7. ✅ Test modals and details views

## Quick Fix Script

Run this find-replace in your IDE:

1. Find: `user\._id`  
   Replace: `user.id`

2. Find: `cat\._id`  
   Replace: `cat.id`

3. Find: `category\._id`  
   Replace: `category.id`

4. Find: `music\._id`  
   Replace: `music.id`

5. Find: `type\._id`  
   Replace: `type.id`

6. Find: `key=\{(.+?)\._id\}`  
   Replace: `key={$1.id}`

7. Find: `data-category-id=\{category\._id\}`  
   Replace: `data-category-id={category.id}`

## Notes

- UUID format is maintained (no breaking changes)
- All relationships work the same way
- JSON fields structure unchanged
- API responses have same structure except `_id` → `id`
- Timestamps (`createdAt`, `updatedAt`) work identically

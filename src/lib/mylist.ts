// MyList/Favorites manager using localStorage

const MYLIST_KEY = 'huastream_mylist';

export interface MyListItem {
    slug: string;
    title: string;
    poster: string;
    addedAt: number;
}

// Get all items from MyList
export function getMyList(): MyListItem[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(MYLIST_KEY);
    return data ? JSON.parse(data) : [];
}

// Check if item is in MyList
export function isInMyList(slug: string): boolean {
    const list = getMyList();
    return list.some(item => item.slug === slug);
}

// Add item to MyList
export function addToMyList(item: Omit<MyListItem, 'addedAt'>): boolean {
    const list = getMyList();
    if (list.some(i => i.slug === item.slug)) return false;

    list.push({
        ...item,
        addedAt: Date.now()
    });

    localStorage.setItem(MYLIST_KEY, JSON.stringify(list));
    return true;
}

// Remove item from MyList
export function removeFromMyList(slug: string): boolean {
    const list = getMyList();
    const filtered = list.filter(item => item.slug !== slug);

    if (filtered.length === list.length) return false;

    localStorage.setItem(MYLIST_KEY, JSON.stringify(filtered));
    return true;
}

// Toggle item in MyList
export function toggleMyList(item: Omit<MyListItem, 'addedAt'>): boolean {
    if (isInMyList(item.slug)) {
        removeFromMyList(item.slug);
        return false; // removed
    } else {
        addToMyList(item);
        return true; // added
    }
}

// Clear all MyList
export function clearMyList(): void {
    localStorage.removeItem(MYLIST_KEY);
}

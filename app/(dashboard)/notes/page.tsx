'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, BookOpen, Calendar, Tag } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: 'Physics',
    tags: '',
  });

  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const saved = localStorage.getItem('userNotes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  };

  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    const now = new Date().toISOString();
    const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t);

    if (editingNote) {
      // Update existing note
      const updated = notes.map(note =>
        note.id === editingNote.id
          ? { ...note, ...formData, tags, updatedAt: now }
          : note
      );
      saveNotes(updated);
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        ...formData,
        tags,
        createdAt: now,
        updatedAt: now,
      };
      saveNotes([newNote, ...notes]);
    }

    handleCloseModal();
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      subject: note.subject,
      tags: note.tags.join(', '),
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      saveNotes(notes.filter(note => note.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setFormData({ title: '', content: '', subject: 'Physics', tags: '' });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-2">
              My Notes
            </h1>
            <p className="text-text-secondary">
              {notes.length} notes saved
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {subjects.map(subject => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedSubject === subject
                    ? 'bg-accent-orange text-white'
                    : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto text-text-secondary mb-4" size={64} />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {searchQuery || selectedSubject !== 'All' ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-text-secondary mb-6">
              {searchQuery || selectedSubject !== 'All' 
                ? 'Try adjusting your filters' 
                : 'Create your first note to get started'}
            </p>
            {!searchQuery && selectedSubject === 'All' && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-all inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Create Note
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent-orange/40 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">
                    {note.subject}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-text-secondary hover:text-accent-orange transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-text-secondary hover:text-error transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-heading font-bold text-text-primary mb-2 line-clamp-2">
                  {note.title}
                </h3>

                <p className="text-sm text-text-secondary line-clamp-3 mb-4">
                  {note.content}
                </p>

                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {note.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-bg-secondary text-text-secondary flex items-center gap-1">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <Calendar size={12} />
                  {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-bg-card border border-border rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
                {editingNote ? 'Edit Note' : 'New Note'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter note title"
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-orange"
                  >
                    {subjects.filter(s => s !== 'All').map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your notes here..."
                    rows={10}
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g., formulas, important, revision"
                    className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-bg-secondary text-text-primary hover:bg-accent-gray rounded-lg px-6 py-3 font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-all"
                >
                  {editingNote ? 'Update' : 'Save'} Note
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

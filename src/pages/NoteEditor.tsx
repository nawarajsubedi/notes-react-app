import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import NoteTitleEditor from '../components/TitleEditor';
import NoteContentEditor from '../components/NoteContentEditor';
import StatusAlert from '../components/StatusAlert';

import { fetchNoteById, setRemainder } from '../services/NoteService';

import { Note } from '../common/types/Note';

import useAuth from '../hooks/useAuth';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './note-editor.css';

import { getValidVariant } from '../common/utils';


const NoteEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const noteId = id ? Number(id) : undefined;

  const [noteData, setNoteData] = useState<Note | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reminderEmail, setReminderEmail] = useState('');
  const [reminderDateTime, setReminderDateTime] = useState<Date | null>(new Date());
  const alertOpts = useRef({ isShow: false, variant: getValidVariant("success"), message: '' });

  const { getSession } = useAuth();
  const user = getSession();

  useEffect(() => {
    if (user) {
      setReminderEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const fetchNoteContent = async () => {
      if (noteId) {
        try {
          const note = await fetchNoteById(noteId);
          if (note) {
            setNoteData(note);
          }
        } catch (error) {
          console.error('Error fetching note content:', error);
        }
      }
    };
    fetchNoteContent();
  }, [noteId]);

  const handleDismissAlert = () => {
    alertOpts.current.isShow = false;
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSetReminder = async () => {
    if (noteData?.id && reminderDateTime) {
      setIsLoading(true);
      try {
        await setRemainder(reminderEmail, noteData.id, reminderDateTime);
        alertOpts.current = { isShow: true, variant: getValidVariant("success"), message: 'Reminder set' };
        handleCloseModal();
      } catch (error: any) {
        alertOpts.current = { isShow: true, variant: getValidVariant("failure"), message: error.message };
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="note-editor">
      <Link to="/console/notes" className="back-link">
        &larr; Back to Notes
      </Link>

      <div className="editor-section">
        <NoteTitleEditor title={noteData?.title || "Untitled Note"} id={id} />
        <NoteContentEditor initialContent={noteData?.content || ''} />
      </div>

      <Button variant="info" className="btn-remainder" onClick={handleShowModal}>
        Set Reminder
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Set Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={reminderEmail}
              onChange={(e) => setReminderEmail(e.target.value)}
            />
          </div>

          <div className="reminder-datetime-picker">
            <label>Pick Date & Time:</label>
            <div className="custom-datetime-picker">
              <DatePicker
                selected={reminderDateTime}
                onChange={(date: Date | null) => setReminderDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={2}
                dateFormat="Pp"
                className="form-control"
                minDate={new Date()}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" disabled={isLoading} onClick={handleSetReminder}>
            Schedule Reminder
          </Button>
        </Modal.Footer>
      </Modal>

      <StatusAlert
        show={alertOpts.current.isShow}
        variant={alertOpts.current.variant}
        message={alertOpts.current.message}
        onDismiss={handleDismissAlert}
      />
    </div>
  );
};

export default NoteEditor;
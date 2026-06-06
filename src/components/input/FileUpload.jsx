import React from 'react';
import { useFileUpload }  from '../../hooks/useFileUpload';
import FilePreviewChip    from './FilePreviewChip';
import { ALLOWED_TYPES }  from '../../utils/fileUtils';

/**
 * @param {{
 *   isDragOver:    boolean,
 *   onDragOver:    (e: DragEvent) => void,
 *   onDragLeave:   () => void,
 *   onDrop:        (e: DragEvent) => void,
 *   onAttachClick: () => void,
 * }} props 
 */
export default function FileUpload({
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onAttachClick,
}) {
  const { files, fileInputRef, addFiles, removeFile } = useFileUpload();

  return (
    <>
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ALLOWED_TYPES.join(',')}
        aria-label="Attach files"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.length) {
            addFiles(e.target.files);
            // Reset so same file can be re-selected
            e.target.value = '';
          }
        }}
      />

      {/* File preview strip (shown only when files are staged) */}
      {files.length > 0 && (
        <div
          role="list"
          aria-label="Staged file attachments"
          style={{
            display:    'flex',
            gap:        7,
            flexWrap:   'wrap',
            marginBottom: 8,
          }}
        >
          {files.map((f, i) => (
            <FilePreviewChip
              key={`${f.name}-${i}`}
              file={f}
              index={i}
              onRemove={removeFile}
            />
          ))}
        </div>
      )}
    </>
  );
}
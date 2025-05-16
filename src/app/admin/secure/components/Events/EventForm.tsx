import React, { useState } from "react";
import { XIcon, PlusIcon } from "lucide-react";
import { Event as ApiEvent } from "@/app/admin/secure/services/eventService";
interface EventFormProps {
  onSubmit: (data: never) => void;
  initialData?: ApiEvent;
}

interface FormData {
  title: string;
  type: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: string | number;
  status: string;
  images: File[];
  imagesPreviews: string[];
}

export const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "",
    type: initialData?.event_type || "conference",
    description: initialData?.description || "",
    date: initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : "",
    startTime: initialData?.start_time ? new Date(initialData.start_time).toISOString().split("T")[1].slice(0, 5) : "",
    endTime: initialData?.end_time ? new Date(initialData.end_time).toISOString().split("T")[1].slice(0, 5) : "",
    location: initialData?.location || "",
    capacity: initialData?.capacity || "",
    status: initialData?.status || "upcoming",
    images: [],
    imagesPreviews: initialData?.images.map((img) => img.image_name) || [],
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: File[] = Array.from(files);
      const readers = newImages.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then((results) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
          imagesPreviews: [...prev.imagesPreviews, ...results],
        }));
      });
    }
  };
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagesPreviews: prev.imagesPreviews.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Images Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Images
        </label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {formData.imagesPreviews.map((preview, index) => (
            <div key={index} className="relative aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-sm hover:bg-gray-100"
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
          <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400">
            <div className="space-y-1 text-center">
              <PlusIcon className="mx-auto h-8 w-8 text-gray-400" />
              <div className="text-sm text-gray-600">Add images</div>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                type: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                startTime: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                endTime: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                capacity: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Active">active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

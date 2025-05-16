'use client'
import { eventService, Event as ApiEvent } from '@/app/admin/secure/services/eventService'
import {
    MapPinIcon,
    CalendarIcon,
    ClockIcon,
    UsersIcon,
    SearchIcon,
    FilterIcon,
    Edit2Icon,
    Trash2Icon,
} from 'lucide-react'

import React, {useEffect, useState} from "react";
import {PageTransition} from "@/app/admin/secure/components/UI/PageTransition";
import {AddButton} from "@/app/admin/secure/components/UI/AddButton";
import {Modal} from "@/app/admin/secure/components/UI/Modal";
import {EventForm} from "@/app/admin/secure/components/Events/EventForm";
import {Badge} from "@/app/admin/secure/components/UI/Badge";

interface EventFormData {
    title: string
    type: string
    date: string // assuming 'YYYY-MM-DD'
    startTime: string // assuming 'HH:mm'
    endTime: string
    location: string
    capacity: string | number
    status: string
    description: string
    images: File[] // or string[] if in edit mode
}


/*interface Event {
    id: number
    title: string
    type: string
    date: string
    startTime: string
    endTime: string
    location: string
    capacity: number
    registered: number
    status: string
    description?: string
    images?: string[]
}*/



const CompanyEvents: React.FC = () => {
    const [events, setEvents] = useState<ApiEvent[]>([])
    const [filteredEvents, setFilteredEvents] = useState<ApiEvent[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState<ApiEvent | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterValue, setFilterValue] = useState('All')
    const [, setIsLoading] = useState(true)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const data = await eventService.getAllEvents()

            setEvents(data)
            setFilteredEvents(data)
        } catch (error) {
            console.error('Failed to fetch events:', error)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        let filtered = events
        if (searchTerm) {
            filtered = filtered.filter(
                (event) =>
                    event.event_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    event.location.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }
        if (filterValue !== 'All') {
            filtered = filtered.filter(
                (event) => event.status.toLowerCase() === filterValue.toLowerCase(),
            )
        }
        setFilteredEvents(filtered)
    }, [searchTerm, filterValue, events])

    const handleAddEvent = async (data: EventFormData) => {
        try {
            const formattedData = {
                title: data.title,
                event_type: data.type,
                date: data.date,
                start_time: `${data.date}T${data.startTime}:00Z`,
                end_time: `${data.date}T${data.endTime}:00Z`,
                location: data.location,
                capacity: data.capacity,
                status: data.status.toLowerCase(),
                description: data.description,
                images: data.images, // <-- keep File[] here, do NOT map to names
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await eventService.createEvent(formattedData)
            await fetchEvents()
            setIsModalOpen(false)

        } catch (error) {
            console.error('Failed to create event:', error)

        }

    }

    const handleEdit = (event: ApiEvent) => {
        setEditingEvent(event)
        setIsModalOpen(true)
    }

    const handleUpdate = async (data: EventFormData) => {
        if (!editingEvent) return
        try {

            const formattedData = {
                title: data.title,
                event_type: data.type,
                date: data.date,
                start_time: `${data.date}T${data.startTime}:00Z`,
                end_time: `${data.date}T${data.endTime}:00Z`,
                location: data.location,
                capacity: data.capacity,
                status: data.status.toLowerCase(),
                description: data.description,
                images: data.images.map((img: File) => img.name),
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await eventService.updateEvent(editingEvent.id, formattedData)
            await fetchEvents()
            setIsModalOpen(false)
            setEditingEvent(null)

        } catch (error) {
            console.error('Failed to update event:', error)

        }
    }

    const handleDelete = async (event: ApiEvent) => {
        if (
            window.confirm(`Are you sure you want to delete "${event.event_type}"?`)
        ) {
            try {
                await eventService.deleteEvent(event.id)
                await fetchEvents()

            } catch (error) {
                console.error('Failed to delete event:', error)

            }
        }
    }




    return (
        <PageTransition>
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-medium sm:text-2xl lg:text-3xl">
                        Company Events Management
                    </h2>
                    <AddButton
                        label="Add Event"
                        onClick={() => {
                            setEditingEvent(null)
                            setIsModalOpen(true)
                        }}
                    />
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon
                            size={20}
                            className="absolute left-3 top-2.5 text-gray-400"
                        />
                    </div>
                    <div className="relative w-full sm:w-48 lg:w-64">
                        <FilterIcon
                            size={20}
                            className="absolute left-3 top-2.5 text-gray-400"
                        />
                        <select
                            className="w-full appearance-none rounded-md border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        >
                            <option value="All">All Types</option>
                            <option value="conference">Conference</option>
                            <option value="workshop">Workshop</option>
                            {/*                <option value="webinar">Webinar</option>
                <option value="networking">Networking</option>*/}
                        </select>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="overflow-hidden rounded-lg bg-white shadow-sm transition-transform hover:scale-[1.02]"
                        >
                            {/*                  <div className="relative aspect-video">
                    <img
                        src={
                          event.images?.[0]?.image_name
                              ? `data:image/png;base64,${event.images[0].image_name}` // Assuming image_name holds the Base64 string
                              : 'https://via.placeholder.com/400x200'
                        }
                        alt={event.title}
                        className="h-full w-full object-cover"
                    />
                    {event.images && event.images.length > 1 && (
                        <div
                            className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                          +{event.images.length - 1}
                        </div>
                    )}
                  </div>*/}
                            <div className="relative aspect-video">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={
                                        event.images?.[0]?.image_name
                                            ? event.images[0].image_name // already a usable relative path
                                            : 'https://via.placeholder.com/400x200'
                                    }
                                    alt={event.title}
                                    className="h-full w-full object-cover"
                                />
                                {event.images && event.images.length > 1 && (
                                    <div
                                        className="absolute right-2 top-2 rounded-full bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
                                        +{event.images.length - 1}
                                    </div>
                                )}
                            </div>


                            <div className="p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                                        {event.title}
                                    </h3>
                                    <Badge
                                        text={event.status}
                                        color={
                                            event.status === 'Upcoming'
                                                ? 'blue'
                                                : event.status === 'Active'
                                                    ? 'green'
                                                    : event.status === 'Completed'
                                                        ? 'gray'
                                                        : 'gray'
                                        }
                                    />
                                </div>
                                <p className="mb-4 text-sm text-gray-500 line-clamp-2">
                                    {event.description}
                                </p>
                                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <CalendarIcon size={16} className="mr-2 text-gray-400"/>
                                        <span>{event.date.toISOString().slice(0, 10)}</span>


                                    </div>
                                    <div className="flex items-center">
                                        <ClockIcon size={16} className="mr-2 text-gray-400"/>
                                        <span>
                        <span>
                        {event.start_time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'N/A'} -
                            {event.end_time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'N/A'}

                        </span>

                        </span>
                                    </div>


                                    <div className="flex items-center">
                                        <MapPinIcon size={16} className="mr-2 text-gray-400"/>
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <UsersIcon size={16} className="mr-2 text-gray-400"/>
                                        <span>
                      {event.registered}  {event.capacity} registered
                    </span>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                    >
                                        <Edit2Icon size={18}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                    >
                                        <Trash2Icon size={18}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center text-gray-500 py-8">No events found</div>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setEditingEvent(null)
                    }}
                    title={editingEvent ? 'Edit Event' : 'Add New Event'}
                >
                    <EventForm
                        onSubmit={editingEvent ? handleUpdate : handleAddEvent}
                        initialData={editingEvent ?? undefined}
                    />
                </Modal>
            </div>
        </PageTransition>
    )
}
export default CompanyEvents

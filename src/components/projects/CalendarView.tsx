'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addDays } from 'date-fns';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  thumbnail: string | null;
  status: string;
  createdAt: string;
  user: User;
  _count: {
    votes: number;
    comments: number;
  };
}

interface CalendarViewProps {
  projects: Project[];
}

export default function CalendarView({ projects }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [projectsByDate, setProjectsByDate] = useState<Record<string, Project[]>>({});

  // Generate calendar days
  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const dayArray = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd
    });

    setCalendarDays(dayArray);
  }, [currentMonth]);

  // Assign projects to their specific dates only once
  useEffect(() => {
    // Create a map of projects by date string (YYYY-MM-DD)
    const projectMap: Record<string, Project[]> = {};
    
    // For each project, assign it to a specific date - in a real app,
    // this would use a launchDate field, but since we don't have that,
    // we'll create a consistent mapping based on project ID
    projects.forEach((project) => {
      // Use the project's creation date as a base
      const baseDate = parseISO(project.createdAt);
      
      // Use parts of the project id to create a deterministic date offset
      // This ensures a project will only appear on ONE specific date
      const idNumber = parseInt(project.id.replace(/[^0-9]/g, '').slice(0, 3) || '1');
      const daysToAdd = (idNumber % 28) + 1; // 1-28 days
      
      // Create a future date for the project
      const projectDate = addDays(baseDate, daysToAdd);
      const dateKey = format(projectDate, 'yyyy-MM-dd');
      
      if (!projectMap[dateKey]) {
        projectMap[dateKey] = [];
      }
      projectMap[dateKey].push(project);
    });
    
    setProjectsByDate(projectMap);
  }, [projects]);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Get projects for a specific date
  const getProjectsForDate = (date: Date): Project[] => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return projectsByDate[dateKey] || [];
  };

  // Get projects for selected date
  const selectedDateProjects = getProjectsForDate(selectedDate);
  const hasSelectedDateProjects = selectedDateProjects.length > 0;

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Today
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Legend */}
      <div className="flex items-center justify-end mb-3 text-xs">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 rounded-full bg-primary-500 mr-1"></div>
          <span>Has launches</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
          <span>No launches</span>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day) => {
          const projectsOnDay = getProjectsForDate(day);
          const hasProjects = projectsOnDay.length > 0;
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          
          return (
            <div 
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`
                min-h-[100px] p-2 border rounded-md transition-all cursor-pointer
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${isToday ? 'border-primary-500' : 'border-gray-200'}
                ${isSelected ? 'ring-2 ring-primary-500 ring-opacity-70' : ''}
                ${hasProjects && isCurrentMonth ? 'hover:shadow-md' : 'hover:shadow-sm'}
              `}
            >
              <div className="flex justify-between">
                <span className={`text-sm font-medium ${isToday ? 'bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                  {format(day, 'd')}
                </span>
                {hasProjects && (
                  <div className={`w-2 h-2 rounded-full ${isCurrentMonth ? 'bg-primary-500' : 'bg-primary-300'}`}></div>
                )}
              </div>

              {/* Project Indicators - only show if there are projects on this day */}
              {hasProjects && (
                <div className="mt-2 space-y-1">
                  {projectsOnDay.slice(0, 2).map((project) => (
                    <a 
                      href={`/projects/${project.slug}`} 
                      key={project.id} 
                      className="block text-xs truncate px-1.5 py-1 rounded bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                    >
                      {project.name}
                    </a>
                  ))}
                  {projectsOnDay.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{projectsOnDay.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Day Projects */}
      {hasSelectedDateProjects ? (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Projects launching on {format(selectedDate, 'MMMM d, yyyy')}
            </h3>
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {selectedDateProjects.length} {selectedDateProjects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedDateProjects.map((project) => (
              <a 
                href={`/projects/${project.slug}`} 
                key={project.id}
                className="block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {project.thumbnail ? (
                      <div className="relative w-10 h-10 mr-3 rounded-md overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 mr-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-md flex items-center justify-center text-white font-bold text-lg">
                        {project.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-sm">{project.name}</h4>
                      <p className="text-xs text-gray-500">{project.user.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.tagline}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">
                      {project.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                        </svg>
                        {project._count.votes}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
                        </svg>
                        {project._count.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        selectedDate && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <div className="text-gray-500 mb-2">
              <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No launches on this date</h3>
            <p className="text-gray-500 text-sm">There are no projects scheduled to launch on {format(selectedDate, 'MMMM d, yyyy')}.</p>
          </div>
        )
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 
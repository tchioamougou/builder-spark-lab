import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Calendar,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  UserCheck,
  School,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";

const getStats = (t: any) => [
  {
    title: t('student.enrolledStudents'),
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: t('teacher.activeTeachers'),
    value: "156",
    change: "+3%",
    changeType: "positive" as const,
    icon: GraduationCap,
  },
  {
    title: t('common.programs'),
    value: "24",
    change: "0%",
    changeType: "neutral" as const,
    icon: BookOpen,
  },
  {
    title: t('common.currentAcademicYear'),
    value: "2023-2024",
    change: t('common.semester2'),
    changeType: "neutral" as const,
    icon: Calendar,
  },
];

const getRecentActivities = (t: any) => [
  {
    id: 1,
    type: "inscription",
    title: t('student.newEnrollmentValidated'),
    description: "Marie Dupont - Pharmacie Année 1",
    time: t('dates.hoursAgo', { count: 2 }),
    icon: UserCheck,
    status: "success",
  },
  {
    id: 2,
    type: "demande",
    title: t('student.absenceRequestPending'),
    description: "Jean Martin - Médecine Année 3",
    time: t('dates.hoursAgo', { count: 4 }),
    icon: Clock,
    status: "pending",
  },
  {
    id: 3,
    type: "programme",
    title: t('programs.newCurriculumCreated'),
    description: "Pharmacie Année 2 - Séquence 1",
    time: t('dates.daysAgo', { count: 1 }),
    icon: FileText,
    status: "info",
  },
  {
    id: 4,
    type: "enseignant",
    title: t('teacher.teacherApplicationApproved'),
    description: "Dr. Sophie Laurent - Anatomie",
    time: t('dates.daysAgo', { count: 2 }),
    icon: CheckCircle,
    status: "success",
  },
];

const getPendingTasks = (t: any) => [
  {
    id: 1,
    title: t('admin.validateEnrollmentRequests', { count: 12 }),
    priority: "high",
    module: t('common.academics'),
  },
  {
    id: 2,
    title: t('admin.reviewTeacherApplications', { count: 3 }),
    priority: "medium",
    module: t('common.hr'),
  },
  {
    id: 3,
    title: t('admin.finalizeCalendar'),
    priority: "high",
    module: t('common.administration'),
  },
  {
    id: 4,
    title: t('admin.processAbsenceJustifications', { count: 8 }),
    priority: "low",
    module: t('common.academics'),
  },
];

export default function Index() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePendingTask = (taskTitle: string, module: string) => {
    // Navigate based on task type and module
    if (
      taskTitle.includes(t('admin.validateEnrollmentRequests', { count: 12 }).split(' ')[0]) ||
      module === t('common.academics')
    ) {
      navigate("/students");
    } else if (
      taskTitle.includes(t('admin.reviewTeacherApplications', { count: 3 }).split(' ')[0]) ||
      module === t('common.hr')
    ) {
      navigate("/teachers");
    } else if (taskTitle.includes(t('admin.finalizeCalendar').split(' ')[0])) {
      navigate("/academic-years");
    } else if (taskTitle.includes(t('admin.processAbsenceJustifications', { count: 8 }).split(' ')[0])) {
      navigate("/files");
    } else {
      navigate("/admin");
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('common.dashboard')}
          </h2>
          <p className="text-muted-foreground">
            {t('common.overview')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {getStats(t).map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span
                    className={
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="h-5 w-5" />
                <span>{t('common.recentActivities')}</span>
              </CardTitle>
              <CardDescription>
                {t('common.latestSystemActions')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRecentActivities(t).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-100 text-green-600"
                          : activity.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>{t('common.pendingTasks')}</span>
              </CardTitle>
              <CardDescription>
                {t('common.actionsRequiringAttention')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getPendingTasks(t).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">
                          {task.title}
                        </p>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority === "high"
                            ? t('common.urgent')
                            : task.priority === "medium"
                              ? t('common.medium')
                              : t('common.low')}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {task.module}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePendingTask(task.title, task.module)}
                    >
                      {t('common.process')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t('common.quickActions')}</CardTitle>
            <CardDescription>
              {t('common.directAccessToMainFeatures')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors group"
                variant="outline"
                onClick={() => navigate("/user-management")}
              >
                <Users className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                <span className="text-sm font-medium group-hover:text-blue-700">
                  {t('common.manageUsers')}
                </span>
              </Button>
              <Button
                className="h-20 flex-col space-y-2 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors group"
                variant="outline"
                onClick={() => navigate("/programs")}
              >
                <BookOpen className="h-6 w-6 text-green-600 group-hover:text-green-700" />
                <span className="text-sm font-medium group-hover:text-green-700">
                  {t('common.programs')}
                </span>
              </Button>
              <Button
                className="h-20 flex-col space-y-2 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors group"
                variant="outline"
                onClick={() => navigate("/files")}
              >
                <FileText className="h-6 w-6 text-orange-600 group-hover:text-orange-700" />
                <span className="text-sm font-medium group-hover:text-orange-700">
                  {t('common.pendingRequests')}
                </span>
              </Button>
              <Button
                className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-colors group"
                variant="outline"
                onClick={() => navigate("/academic-years")}
              >
                <Calendar className="h-6 w-6 text-purple-600 group-hover:text-purple-700" />
                <span className="text-sm font-medium group-hover:text-purple-700">
                  {t('common.academicCalendar')}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

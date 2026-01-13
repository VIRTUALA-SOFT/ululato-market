/**
 * ULULATO Notifications Drawer
 * Design: Slide-out panel with notification cards
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { X, Bell, BellOff, Check, CheckCheck, Trash2, Package, Tag, AlertTriangle, Info, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotificationsStore, NotificationType } from '@/lib/store';
import { cn } from '@/lib/utils';

const notificationIcons: Record<NotificationType, typeof Bell> = {
  info: Info,
  success: Check,
  warning: AlertTriangle,
  promo: Tag,
  stock: Package,
  order: ShoppingBag,
};

const notificationColors: Record<NotificationType, string> = {
  info: 'bg-blue-500/20 text-blue-400',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  promo: 'bg-primary/20 text-primary',
  stock: 'bg-orange-500/20 text-orange-400',
  order: 'bg-purple-500/20 text-purple-400',
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return new Date(date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
}

export default function NotificationsDrawer() {
  const { 
    notifications, 
    unreadCount, 
    isOpen, 
    closeNotifications, 
    markAsRead, 
    markAllAsRead,
    removeNotification,
    clearNotifications 
  } = useNotificationsStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={closeNotifications}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-white/10 z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg">Notificaciones</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {unreadCount} sin leer
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={closeNotifications}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="p-3 border-b border-white/10 flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 gap-2 border-white/10"
                onClick={markAllAsRead}
              >
                <CheckCheck className="w-4 h-4" />
                Marcar todas como leídas
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 border-white/10 text-destructive hover:bg-destructive/10"
              onClick={clearNotifications}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <ScrollArea className="flex-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <BellOff className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold mb-2">Sin notificaciones</h3>
              <p className="text-sm text-muted-foreground">
                Te avisaremos cuando haya ofertas, actualizaciones de pedidos y más
              </p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {notifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                const colorClass = notificationColors[notification.type];

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      'group relative p-4 rounded-xl border transition-all duration-200',
                      notification.read 
                        ? 'bg-transparent border-white/5 opacity-70' 
                        : 'bg-white/5 border-white/10'
                    )}
                  >
                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}

                    <div className="flex gap-3">
                      {/* Icon or Image */}
                      {notification.imageUrl ? (
                        <img 
                          src={notification.imageUrl} 
                          alt="" 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', colorClass)}>
                          <Icon className="w-5 h-5" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.message}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-3">
                          {notification.actionUrl && (
                            <Link href={notification.actionUrl} onClick={closeNotifications}>
                              <Button 
                                size="sm" 
                                className="h-7 text-xs bg-primary/10 text-primary hover:bg-primary/20"
                              >
                                {notification.actionLabel || 'Ver más'}
                              </Button>
                            </Link>
                          )}
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Leído
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
}
